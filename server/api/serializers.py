from rest_framework import serializers
from .models import User, Pet, Address, Post, Photo


class UserSerializer(serializers.ModelSerializer):
    pets = serializers.StringRelatedField(many=True)
    addresses = serializers.StringRelatedField(many=True)
    post_users = serializers.StringRelatedField(many=True)

    class Meta:
        model = User
        fields = "__all__"


class PetSerializer(serializers.ModelSerializer):
    post_pets = serializers.StringRelatedField(many=True)
    pet_photos = serializers.StringRelatedField(many=True)

    class Meta:
        model = Pet
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    post_photos = serializers.StringRelatedField(many=True)

    class Meta:
        model = Post
        fields = "__all__"


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = "__all__"
