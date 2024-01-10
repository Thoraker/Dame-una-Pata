from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import permissions, viewsets
from .models import User, Pet
from .serializers import UserSerializer, PetSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
