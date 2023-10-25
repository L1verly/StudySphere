from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, CreateAPIView
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from config import settings
from .models import (
    Room, Message, Topic,
    UserAccount)
from .serializers import (
    # RegisterUserSerializer,
    TopicSerializer,
    UserSerializer,
    MessageSerializer,
    RoomWriteSerializer,
    RoomReadSerializer,
)
from django.shortcuts import get_object_or_404
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly,
    IsAuthenticated,
    AllowAny,
)
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import action


class UserViewSet(ModelViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class RoomsViewSet(ModelViewSet):
    queryset = Room.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.request.method == "PUT" or self.request.method == "POST":
            return RoomWriteSerializer
        else:
            return RoomReadSerializer


class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class TopicViewSet(ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


# class UserAPIView(RetrieveAPIView):
#     permission_classes = [IsAuthenticated]
#     serializer_class = UserSerializer

#     def get_object(self):
#         return self.request.user


# class CustomProviderAuthView(ProviderAuthView):
#     def post(self, request, *args, **kwargs):
#         response = super().post(request, *args, **kwargs)
#
#         if response.status_code == 201:
#             access_token = response.data.get('access')
#             refresh_token = response.data.get('refresh')
#
#             response.set_cookie(
#                 'access',
#                 access_token,
#                 max_age=settings.AUTH_COOKIE_MAX_AGE,
#                 path=settings.AUTH_COOKIE_PATH,
#                 secure=settings.AUTH_COOKIE_SECURE,
#                 httponly=settings.AUTH_COOKIE_HTTP_ONLY,
#                 samesite=settings.AUTH_COOKIE_SAMESITE
#             )
#             response.set_cookie(
#                 'refresh',
#                 refresh_token,
#                 max_age=settings.AUTH_COOKIE_MAX_AGE,
#                 path=settings.AUTH_COOKIE_PATH,
#                 secure=settings.AUTH_COOKIE_SECURE,
#                 httponly=settings.AUTH_COOKIE_HTTP_ONLY,
#                 samesite=settings.AUTH_COOKIE_SAMESITE
#             )
#
#         return response


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')

            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
            response.set_cookie(
                'refresh',
                refresh_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )

        return response


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')

        if refresh_token:
            request.data['refresh'] = refresh_token

        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')

            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )

        return response


class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access')

        if access_token:
            request.data['token'] = access_token

        return super().post(request, *args, **kwargs)


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('access')
        response.delete_cookie('refresh')

        return response


