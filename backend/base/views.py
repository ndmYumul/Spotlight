from django.shortcuts import render
from django.http import JsonResponse
#from base.buildings import buildings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Building
from .serializers import BuildingSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from base.serializers import UserSerializerWithToken

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/buildings/',
        '/api/buildings/create/',
        '/api/buildings/upload/',
        '/api/buildings/<id>/reviews/',
        '/api/buildings/top/',
        '/api/buildings/<id>/',
        '/api/buildings/delete/<id>/',
        '/api/buildings/<update>/<id>/',
    ]
    return Response(routes)

@api_view(['GET'])
def getBuildings(request):
    buildings = Building.objects.all()
    serializer = BuildingSerializer(buildings, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getBuilding(request, pk):
    try:
        building = Building.objects.get(_id=pk)
        serializer = BuildingSerializer(building, many=False)
        return Response(serializer.data)
    except Building.DoesNotExist:
        return Response({'detail': 'Building not found'}, status=404)
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)