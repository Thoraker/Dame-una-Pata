from . import db
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


# Auxiliar table
owners_pets = db.Table(
    "owners_pets",
    db.Column("owner_id", db.String, db.ForeignKey("users.id")),
    db.Column("pet_id", db.String, db.ForeignKey("pets.id")),
    db.Column("created_at", db.DateTime, default=db.func.current_timestamp()),
)


# User Model
class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String, primary_key=True, default=db.func.uuid())
    name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    first_name = db.Column(db.String(150), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    avatar = db.Column(db.String(250), nullable=True)
    active = db.Column(db.Boolean, default=True)
    is_admin = db.Column(db.Boolean, default=False)
    is_superuser = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    pets = db.relationship("Pets", secondary=owners_pets, back_populates="users")

    def __init__(self, name, email, password, first_name, last_name, avatar):
        self.name = name
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.avatar = avatar

    def __repr__(self):
        return f"<Users{self.name} {self.first_name} {self.last_name} {self.active} {self.created_at}"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "avatar": self.avatar,
            "active": self.active,
            "is_admin": self.is_admin,
            "is_superuser": self.is_superuser,
            "created_at": self.created_at,
        }


# Pet Model
class Pets(db.Model):
    __tablename__ = "pets"
    id = db.Column(db.String, primary_key=True, default=db.func.uuid())
    name = db.column(db.String(80), nullable=True)
    specie = db.column(db.Integer, nullable=True)
    size = db.column(db.Integer, nullable=True)
    age = db.column(db.Integer, nullable=True)
    description = db.Column(db.String(250), nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    for_adoption = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    users = db.relationship("Users", secondary=owners_pets, back_populates="pets")

    def __init__(self, name, specie, size, age, description):
        self.name = name
        self.specie = specie
        self.size = size
        self.age = age
        self.description = description

    def __repr__(self):
        return f"<Pets{self.name} {self.specie} {self.description} {self.is_active} {self.for_adoption} {self.created_at}"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "specie": self.specie,
            "size": self.size,
            "age": self.age,
            "description": self.description,
            "is_active": self.is_active,
            "for_adoption": self.for_adoption,
            "created_at": self.created_at,
        }


# Address Model
class Addresses(db.Model):
    __tablename__ = "addresses"
    id = db.Column(db.String, primary_key=True, default=db.func.uuid())
    street = db.column(db.String(80))
    number = db.column(db.Integer)
    department = db.column(db.Integer, nullable=True)
    region = db.column(db.Integer)
    city = db.column(db.Integer)
    commune = db.Column(db.Integer)

    def __init__(self, street, number, department, region, city, commune):
        self.street = street
        self.number = number
        self.department = department
        self.region = region
        self.city = city
        self.commune = commune

    def __repr__(self):
        return f"<Addresses {self.street} {self.number} {self.department} {self.region} {self.city} {self.commune}"
