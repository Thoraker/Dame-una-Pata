from django.db import models


# Create your models here.
class Address(models.Model):
    street = models.CharField(max_length=100)
    building_number = models.IntegerField()
    department_number = models.IntegerField()
    commune = models.IntegerField()
    region = models.IntegerField()
    is_active = models.BooleanField(default=True)
    main_house = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.street} {self.building_number} {self.department_number} {self.commune} {self.region} {self.main_house}"

    def serialize(self):
        return {
            "street": self.street,
            "building_number": self.building_number,
            "department_number": self.department_number,
            "commune": self.commune,
            "region": self.region,
            "is_active": self.is_active,
            "main_house": self.main_house,
        }

    class Meta:
        verbose_name = "Address"
        verbose_name_plural = "Addresses"


class Photo(models.Model):
    url = models.CharField(max_length=150)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.url}"

    def serialize(self):
        return {"url": self.url, "is_active": self.is_active}

    class Meta:
        verbose_name = "Photo"
        verbose_name_plural = "Photos"


class Post(models.Model):
    message = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    photos = models.ForeignKey(Photo, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.message}"

    def serialize(self):
        return {
            "message": self.message,
            "is_active": self.is_active,
            "photos": [photo.serialize() for photo in self.photos],
        }

    class Meta:
        verbose_name = "Post"
        verbose_name_plural = "Posts"


class Pet(models.Model):
    name = models.CharField(max_length=50)
    specie = models.CharField(max_length=50)
    age = models.CharField(max_length=50)
    size = models.CharField(max_length=50)
    for_adoption = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    photos = models.ForeignKey(Photo, on_delete=models.CASCADE, null=True)
    posts = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.name} {self.specie} {self.size} {self.for_adoption}"

    def serialize(self):
        return {
            "name": self.name,
            "specie": self.specie,
            "age": self.age,
            "size": self.size,
            "for_adoption": self.for_adoption,
            "is_active": self.is_active,
            "photos": [photo.serialize() for photo in self.photos],
            "posts": [post.serialize() for post in self.posts],
        }

    class Meta:
        verbose_name = "Pet"
        verbose_name_plural = "Pets"


class User(models.Model):
    user_name = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    avatar = models.CharField(
        max_length=150,
        default="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
        editable=True,
    )
    is_active = models.BooleanField(default=True)
    houses = models.ForeignKey(Address, on_delete=models.CASCADE)
    pets = models.ManyToManyField(Pet)
    posts = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.user_name} {self.first_name} {self.last_name} {self.email}"

    def serialize(self):
        return {
            "user_name": self.user_name,
            "password": self.password,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "avatar": self.avatar,
            "is_active": self.is_active,
            "houses": [house.serialize() for house in self.houses],
            "pets": [pet.serialize() for pet in self.pets],
            "posts": [post.serialize() for post in self.posts],
        }

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
