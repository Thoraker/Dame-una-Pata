from django.db import models
from data.extensions import get_uuid


# Create your models here.
class Address(models.Model):
    id = models.AutoField(primary_key=True)
    public_id = models.CharField(max_length=250, default=get_uuid)
    street = models.CharField(max_length=250)
    building_number = models.CharField(max_length=250)
    department_number = models.CharField(max_length=250)
    commune = models.CharField(max_length=250)
    region = models.CharField(max_length=250)
    has_backyard = models.BooleanField(default=False)


class Photo(models.Model):
    id = models.AutoField(primary_key=True)
    public_id = models.CharField(max_length=250, default=get_uuid)
    url = models.CharField(max_length=250)


class Post(models.Model):
    id = models.AutoField(primary_key=True)
    message = models.CharField(max_length=512)


class Pet(models.Model):
    id = models.AutoField(primary_key=True)
    public_id = models.CharField(max_length=250, default=get_uuid)
    name = models.CharField(max_length=250)
    age = models.IntegerField()
    specie = models.CharField(max_length=250)
    size = models.CharField(max_length=250)
    need_backyard = models.BooleanField(default=False)
    for_adoption = models.BooleanField(default=True)
    photos = models.ForeignKey(Photo, on_delete=models.CASCADE)
    posts = models.ForeignKey(Post, on_delete=models.CASCADE)


class User(models.Model):
    id = models.AutoField(primary_key=True)
    public_id = models.CharField(max_length=250, default=get_uuid)
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=250)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    avatar = models.CharField(max_length=250)
    pets = models.ManyToManyField(Pet, through="Owners_pets")
    houses = models.ForeignKey(Address, on_delete=models.CASCADE)
    posted_by = models.ForeignKey(Post, on_delete=models.CASCADE)


class Owners_pets(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    adoption_date = models.DateField(auto_now=True)
