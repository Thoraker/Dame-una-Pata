from uuid import uuid4
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


# Auxiliar table
owners_pets = db.Table(
    "owners_pets",
    db.Column("owner_id", db.String, db.ForeignKey("users.id")),
    db.Column("pet_id", db.String, db.ForeignKey("pets.id")),
    db.Column("created_at", db.DateTime, default=db.func.current_timestamp()),
)


# User Model
class User(db.Model):
    __tablename__ = "users"
    id: str = db.Column(db.String(80), primary_key=True, default=uuid4())
    name: str = db.Column(db.String(80), unique=True, nullable=False)
    email: str = db.Column(db.String(250), unique=True, nullable=False)
    password: str = db.Column(db.String(250), nullable=False)
    first_name: str = db.Column(db.String(150), nullable=False)
    last_name: str = db.Column(db.String(250), nullable=False)
    avatar: str = db.Column(db.String(250), nullable=True)
    is_active: bool = db.Column(db.Boolean, default=True)
    is_admin: bool = db.Column(db.Boolean, default=False)
    is_superuser: bool = db.Column(db.Boolean, default=False)
    created_at: str = db.Column(db.DateTime, default=db.func.current_timestamp())

    pets = db.relationship("Pet", secondary=owners_pets, back_populates="owners")
    houses = db.relationship("Address", backref="home_owner")
    posts = db.relationship("Post", backref="user_post")

    def __init__(self, name, email, password, first_name, last_name, avatar):
        self.name = name
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.avatar = avatar

    def __repr__(self):
        return f"<User {self.name} {self.first_name} {self.last_name} {self.is_active} {self.created_at}"

    def serialize(self):
        return {
            "name": self.name,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "avatar": self.avatar,
            "is_active": self.is_active,
            "pets": [pet.serialize() for pet in self.pets],  # type: ignore
            "houses": [house.serialize() for house in self.houses],  # type: ignore
            "posts": [post.serialize() for post in self.posts],  # type: ignore
        }


# Pet Model
class Pet(db.Model):
    __tablename__ = "pets"
    id: str = db.Column(db.String, primary_key=True, default=uuid4())
    name: str = db.Column(db.String(80), nullable=True)
    specie: int = db.Column(db.Integer, nullable=True)
    size: int = db.Column(db.Integer, nullable=True)
    age: int = db.Column(db.Integer, nullable=True)
    description: str = db.Column(db.String(250), nullable=True)
    is_active: bool = db.Column(db.Boolean, default=True)
    for_adoption: bool = db.Column(db.Boolean, default=True)
    created_at: str = db.Column(db.DateTime, default=db.func.current_timestamp())

    owners = db.relationship("User", secondary=owners_pets, back_populates="pets")
    posts = db.relationship("Post", backref="pet_post")
    photos = db.relationship("Photo", backref="pet_photo")

    def __init__(self, name, specie, size, age, description, for_adoption):
        self.name = name
        self.specie = specie
        self.size = size
        self.age = age
        self.description = description
        self.for_adoption = for_adoption

    def __repr__(self):
        return f"<Pet {self.name} {self.specie} {self.description} {self.is_active} {self.for_adoption} {self.created_at}"

    def serialize(self):
        return {
            "name": self.name,
            "specie": self.specie,
            "size": self.size,
            "age": self.age,
            "is_active": self.is_active,
            "description": self.description,
            "for_adoption": self.for_adoption,
            "photos": [photo.serialize() for photo in self.photos],  # type: ignore
            "created_at": self.created_at,
        }

    def add_owner(self, user):
        self.owners.append(user)

    def remove_owner(self, user):
        self.owners.remove(user)

    def add_post(self, post):
        self.posts.append(post)


# Address Model
class Address(db.Model):
    __tablename__ = "addresses"
    id: str = db.Column(db.String, primary_key=True, default=uuid4())
    street: str = db.Column(db.String(80))
    number: int = db.Column(db.Integer)
    department: int = db.Column(db.Integer, nullable=True)
    region: int = db.Column(db.Integer)
    city: int = db.Column(db.Integer)
    commune: int = db.Column(db.Integer)
    is_active: bool = db.Column(db.Boolean, default=True)

    owner_id = db.Column(db.String, db.ForeignKey("users.id"))

    def __init__(self, street, number, department, region, city, commune, owner_id):
        self.street = street
        self.number = number
        self.department = department
        self.region = region
        self.city = city
        self.commune = commune
        self.owner_id = owner_id

    def __repr__(self):
        return f"<Address {self.street} {self.number} {self.department} {self.region} {self.city} {self.commune}"

    def serialize(self):
        return {
            "id": self.id,
            "street": self.street,
            "number": self.number,
            "department": self.department,
            "region": self.region,
            "city": self.city,
            "commune": self.commune,
        }

    def add_owner(self, user):
        self.owner = user


# Photo Model
class Photo(db.Model):
    __tablename__ = "photos"
    id: str = db.Column(db.String, primary_key=True, default=uuid4())
    url: str = db.Column(db.String(250))
    is_active: bool = db.Column(db.Boolean, default=True)
    pet_id: str = db.Column(db.String, db.ForeignKey("pets.id"))

    def __init__(self, url):
        self.url = url

    def __repr__(self):
        return f"<Photo {self.url}"

    def serialize(self):
        return {
            "id": self.id,
            "url": self.url,
            "is_active": self.is_active,
            "pet_id": self.pet_id,
        }


# Post Model
class Post(db.Model):
    __tablename__ = "posts"
    id: str = db.Column(db.String, primary_key=True)
    reference_post_id: int = db.Column(db.Integer, unique=False, nullable=True)
    message: str = db.Column(db.String(500), unique=False, nullable=False)
    is_active: bool = db.Column(db.Boolean, default=True)
    pet_id: str = db.Column(db.String, db.ForeignKey("pets.id"))
    user_id: str = db.Column(db.String, db.ForeignKey("users.id"))

    # answers = db.relationship("Pet", back_populates="posts")

    def __init__(self, message, user_id):
        self.message = message
        self.user_id = user_id

    def __repr__(self):
        return f'Post("{self.message}","{self.pet_id}, "{self.user_id}")'

    def serialize(self):
        return {
            "id": self.id,
            "reference_post_id": self.reference_post_id,
            "message": self.message,
            "is_active": self.is_active,
            "pet_id": self.pet_id,
            "user_id": self.user_id,
        }
