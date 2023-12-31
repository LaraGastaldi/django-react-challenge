from django.contrib import admin
from django.urls import include, path

from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets


# Serializers define the API representation.
# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = ['url', 'username', 'email']


# ViewSets define the view behavior.
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# Routers provide an easy way of automatically determining the URL conf.
# router = routers.DefaultRouter()
# router.register(r'users', UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include('auth.urls')),
    path('', include('user.urls')),
    path('', include('company.urls'))
]
# urlpatterns = [
#     # path('admin/', admin.site.urls),
#     path("auth/", include("auth.urls"))
# ]
