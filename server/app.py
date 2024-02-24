import os
import datetime
from functools import wraps
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import jwt
from admin import setup_admin
from models import User, Pet, Post, Photo, Address, db
from utils import APIException, generate_sitemap
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)


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
            active_user = User.query.filter_by(public_id=data["public_id"]).first()
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
    users = User.query.all()
    if not users:
        return jsonify({"response": "No hay usuarios registrados"}), 404
    response_body = jsonify([user.serialize() for user in users])
    return (response_body), 200


@app.route("/pets", methods=["GET"])
def get_available_pets():
    pets = Pet.query.filter_by(for_adoption=True).all()
    if not pets:
        return jsonify({"response": "No hay mascotas disponibles"}), 404
    return jsonify([pet.serialize() for pet in pets]), 200


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

    user = User.query.filter_by(name=auth["user_name"]).first()
    if not user:
        return make_response(
            {
                "message": "Usuario no encontrado",
                "WWW.Authentication": 'Basic realm: "login required"',
            }
        )
    if check_password_hash(user.password, auth["password"]):
        token = jwt.encode(
            {
                "id": user.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
            },
            app.config["SECRET_KEY"],
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
        number=data["building_number"],
        department=data["department_number"],
        region=data["region"],
        commune=data["commune"],
        city=data["city"],
        owner_id=active_user.id,
    )
    db.session.add(new_house)
    db.session.commit()
    return (
        jsonify({"response": "Registro exitoso", "user": active_user.serialize()}),
        200,
    )


@app.route("/pet/<string:id>", methods=["GET"])
def get_pet(id):
    searched_pet = Pet.query.filter_by(id=id).all()
    if not searched_pet:
        return jsonify({"response": "No se encontró la mascota"}), 404
    else:
        return (
            jsonify(
                {
                    "response": "Registro exitoso",
                    "pet": [pet.serialize() for pet in searched_pet],
                }
            ),
            200,
        )


@app.route("/pet", methods=["GET", "POST"])
@token_required
def manage_pet(active_user):
    data = request.get_json()
    new_pet = Pet(
        name=data["name"],
        specie=data["specie"],
        size=data["size"],
        age=data["age"],
        description=data["description"],
        for_adoption=data["for_adoption"],
    )
    new_pet.add_owner(active_user)
    new_post = Post(message=data["message"], user_id=active_user.id)
    new_pet.add_post(new_post)
    db.session.add(new_pet)
    db.session.commit()
    return (
        jsonify(
            {
                "response": "Registro exitoso",
                "pet": new_pet.serialize(),
                "user": active_user.serialize_extended(),
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
        user_id=active_user.id,
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
