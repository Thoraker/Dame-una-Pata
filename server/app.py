from ctypes import addressof
import os
import datetime
from functools import wraps
from flask import Flask, jsonify, make_response, request, url_for
from flask_cors import CORS
import jwt
from flask_migrate import Migrate
from sqlalchemy import exists
from utils import APIException, generate_sitemap
from admin import setup_admin
from models import User, Pet, Post, Photo, Address, db
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

db_key = os.getenv("SECRET_KEY")
db_url = os.getenv("DATABASE_URL")
db_imageshack_key = os.getenv("IMAGESHACK_KEY")

app.config["SECRET_KEY"] = db_key

if db_url is not None:
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url.replace(
        "postgres://", "postgresql://"
    )
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/test.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

MIGRATE = Migrate(app, db)
db.init_app(app)
setup_admin(app)


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]
        if not token:
            return jsonify({"response": "No tiene un token valido"}), 401
        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            active_user = User.query.filter_by(id=data["id"]).first()
        except Exception as e:  # Capture the exception
            return jsonify({"response": "No tiene un token valido"}), 401
        return f(active_user, *args, **kwargs)

    return decorator


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


@app.route("/")
def sitemap():
    return generate_sitemap(app)


@app.route("/users", methods=["GET"])
def handle_hello():
    if request.args.get("name") is not None:
        user = User.query.filter_by(name=request.args.get("name")).first()
        if not user:
            return jsonify({"response": "No hay usuarios con ese nombre"}), 404
        return jsonify({"user": user.serialize()}), 200
    if request.args.get("page") is not None:
        users = User.query.paginate(per_page=10, page=int(request.args.get("page")), error_out=True)  # type: ignore
        return (
            jsonify(
                {
                    "iter": [num for num in users.iter_pages()],
                    "previous_page": users.prev_num,
                    "next_page": users.next_num,
                    "users": [user.serialize() for user in users],
                    "page": int(request.args.get("page")),  # type: ignore
                }
            ),
            200,
        )
    users = User.query.paginate(per_page=10, page=1, error_out=True)  # type: ignore
    return (
        jsonify(
            {
                "iter": [num for num in users.iter_pages()],
                "previous_page": users.prev_num,
                "next_page": users.next_num,
                "users": [user.serialize() for user in users],
                "page": 1,
            }
        ),
        200,
    )


@app.route("/pets", methods=["GET"])
def get_all_available_pets():
    if request.args.get("name") is not None:
        searched_pet = Pet.query.filter_by(name=request.args.get("name")).first()
        if not searched_pet:
            return (
                jsonify({"response": "No hay mascotas disponibles con ese nombre"}),
                404,
            )
        return jsonify({"pet": searched_pet.serialize()}), 200
    if request.args.get("page") is not None:
        available_pets = Pet.query.paginate(per_page=10, page=int(request.args.get("page")), error_out=True)  # type: ignore
        if not available_pets:
            return jsonify({"response": "No hay mascotas disponibles"}), 404
        return (
            jsonify(
                {
                    "response": "Registro exitoso",
                    "iter": [num for num in available_pets.iter_pages()],
                    "previous_page": available_pets.prev_num,
                    "next_page": available_pets.next_num,
                    "pets": [pet.serialize() for pet in available_pets],
                    "page": int(request.args.get("page")),  # type: ignore
                }
            ),
            200,
        )
    available_pets = Pet.query.paginate(per_page=10, page=1, error_out=True)  # type: ignore
    return (
        jsonify(
            {
                "response": "Registro exitoso",
                "iter": [num for num in available_pets.iter_pages()],
                "previous_page": available_pets.prev_num,
                "next_page": available_pets.next_num,
                "pets": [pet.serialize() for pet in available_pets],
                "page": 1,
            }
        ),
        200,
    )


@app.route("/register", methods=["GET", "POST"])
def register_user():
    data = request.get_json()
    if (
        not data
        or not data["name"]
        or not data["email"]
        or not data["password"]
        or not data["first_name"]
        or not data["last_name"]
    ):
        return jsonify({"response": "Faltan datos para el registro"}), 400
    hashed_password = generate_password_hash(data["password"], method="scrypt")
    new_user = User(
        name=data["name"],
        email=data["email"],
        password=hashed_password,
        first_name=data["first_name"],
        last_name=data["last_name"],
        avatar=data["avatar"],
    )
    db.session.add(new_user)
    db.session.commit()
    return (
        jsonify({"response": "Registro exitoso", "user": new_user.serialize()}),
        200,
    )


@app.route("/login", methods=["GET", "POST"])
def login_user():
    auth = request.get_json()
    if not auth or not auth["name"] or not auth["password"]:
        return make_response(
            "could not verify",
            401,
            {"WWW.Authentication": 'Basic realm: "login required"'},
        )

    user = User.query.filter_by(name=auth["name"]).first()
    if not user:
        return make_response(
            {
                "response": "Usuario no encontrado",
                "WWW.Authentication": 'Basic realm: "login required"',
            }
        )
    if check_password_hash(user.password, auth["password"]):
        token = jwt.encode(
            {
                "id": user.id,
                "exp": datetime.datetime.now(datetime.timezone.utc)
                + datetime.timedelta(minutes=60),
            },
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )
        return (
            jsonify(
                {
                    "response": "Ingreso correcto",
                    "user": user.serialize(),
                    "token": token,
                }
            ),
            200,
        )
    return make_response(
        "could not verify", 401, {"WWW.Authentication": 'Basic realm: "login required"'}
    )


@app.route("/address", methods=["GET", "POST"])
@token_required
def manage_address(active_user):
    data = request.get_json()
    new_house = Address(
        street=data["street"],
        number=data["number"],
        department=data["number"],
        region=data["region"],
        commune=data["commune"],
        main_residence=data["main_residence"],
        owner_id=active_user.id,
    )
    db.session.add(new_house)
    db.session.commit()
    return (
        jsonify({"response": "Registro exitoso", "user": active_user.serialize()}),
        200,
    )


@app.route("/pet", methods=["GET", "POST"])
@token_required
def manage_pet(active_user):
    data = request.get_json()
    new_pet = Pet(
        name=data["name"],
        specie=data["specie"],
        age=data["age"],
        size=data["size"],
        for_adoption=data["for_adoption"],
        message=data["message"],
    )
    location = data["location"]
    new_pet.add_owner(active_user, location)
    new_post = Post(
        message=data["message"], poster_id=active_user.id, reference_post_id=None
    )
    new_pet.add_post(new_post)
    db.session.add(new_pet)
    db.session.commit()
    return (
        jsonify(
            {
                "response": "Registro exitoso",
                "pet": new_pet.serialize(),
                "user": active_user.serialize(),
            }
        ),
        200,
    )


@app.route("/photo", methods=["GET", "POST"])
@token_required
def manage_pictures(active_user):
    data = request.get_json()
    new_photo = Photo(url=data["url"])
    db.session.add(new_photo)
    db.session.commit()
    return (
        jsonify(
            {
                "response": "Registro exitoso",
                "photo": new_photo.serialize(),
                "user": active_user.serialize(),
            }
        ),
        200,
    )


@app.route("/post", methods=["GET", "POST"])
@token_required
def manage_post(active_user):
    data = request.get_json()
    if not data.message or not data.pet_id or not data.user_id:
        return jsonify({"response": "Faltan datos"}), 404
    new_post = Post(
        message=data["message"],
        poster_id=active_user.id,
        reference_post_id=data["reference_post_id"],
    )
    searched_pet = Pet.query.filter(Pet.id == data["pet_id"]).first()
    if not searched_pet:
        return jsonify({"response": "No se encontró la mascota"}), 404
    searched_pet.add_post(new_post)
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"response": "Registro exitoso", "post": new_post.serialize()}), 200


if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 3000))
    app.run(host="0.0.0.0", port=PORT, debug=False)
