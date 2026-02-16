from django.urls import path
from . import views
from rest_framework_simplejwt.views import ( TokenObtainPairView )

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('buildings/', views.getBuildings, name="buildings"),
    path('buildings/<str:pk>/', views.getBuilding, name="building"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.getUserProfile, name="user-profile"),
]