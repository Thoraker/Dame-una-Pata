from django.db import models


# Create your models here.
class User(models.Model):
    user_name = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    email = models.EmailField(
        max_length=100,
        unique=True,
        editable=True,
    )
    first_name = models.CharField(
        max_length=50,
        editable=True,
    )
    last_name = models.CharField(
        max_length=50,
        editable=True,
    )
    avatar = models.CharField(
        max_length=150,
        default="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
        editable=True,
    )
    is_active = models.BooleanField(
        default=True,
        editable=True,
    )
    is_staff = models.BooleanField(
        default=False,
        editable=True,
    )
    is_superuser = models.BooleanField(
        default=False,
        editable=True,
    )

    def __str__(self):
        return f"{self.user_name} {self.first_name} {self.last_name} {self.email}"

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


class Pet(models.Model):
    name = models.CharField(max_length=50)
    specie = models.CharField(max_length=50)
    age = models.CharField(max_length=50)
    size = models.CharField(max_length=50)
    for_adoption = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    owner = models.ManyToManyField(User, related_name="pets")

    def __str__(self):
        return f"{self.name} {self.specie} {self.size} {self.for_adoption}"

    class Meta:
        verbose_name = "Pet"
        verbose_name_plural = "Pets"


class Address(models.Model):
    street = models.CharField(max_length=100)
    building_number = models.CharField(max_length=10)
    department_number = models.CharField(max_length=10)
    commune = models.CharField(max_length=10)
    region = models.CharField(max_length=10)
    is_active = models.BooleanField(default=True)
    main_house = models.BooleanField(default=False)
    homeOwner = models.ForeignKey(
        User, related_name="addresses", on_delete=models.CASCADE, null=True
    )

    def __str__(self):
        return f"{self.street} {self.building_number} {self.department_number} {self.commune} {self.region} {self.main_house} {self.homeOwner}"

    class Meta:
        verbose_name = "Address"
        verbose_name_plural = "Addresses"


class Post(models.Model):
    message = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    postedBy = models.ForeignKey(
        User, related_name="posts", on_delete=models.CASCADE, null=True
    )

    def __str__(self):
        return f"{self.message}"

    class Meta:
        verbose_name = "Post"
        verbose_name_plural = "Posts"


class Photo(models.Model):
    url = models.CharField(max_length=150)
    is_active = models.BooleanField(default=True)
    post = models.ForeignKey("Post", on_delete=models.CASCADE, null=True)
    pet = models.ForeignKey("Pet", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.url}"

    class Meta:
        verbose_name = "Photo"
        verbose_name_plural = "Photos"
