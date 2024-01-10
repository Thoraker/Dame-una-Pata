from rest_framework import serializers
from .models import User, Pet, Address, Post, Photo


class UserSerializer(serializers.ModelSerializer):
    pets = serializers.StringRelatedField(many=True)
    addresses = serializers.StringRelatedField(many=True)
    posts = serializers.StringRelatedField(many=True)

    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            "password": {"write_only": True},
            "is_active": {"write_only": True},
            "is_staff": {"write_only": True},
            "is_superuser": {"write_only": True},
        }


class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = "__all__"
