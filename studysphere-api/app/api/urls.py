from django.urls import path, include
from .views import (
    RoomsViewSet,
    MessageViewSet,
    TopicViewSet,
    # UserAPIView,
    UserViewSet,
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    LogoutView,
)
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'rooms', RoomsViewSet)
router.register(r'users', UserViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'topics', TopicViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", CustomTokenVerifyView.as_view(), name="token_verify"),
    # path('user/<int:id>/', UserAPIView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout')
]
