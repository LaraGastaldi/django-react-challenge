from django.db import models

from rest_framework.authentication import TokenAuthentication, get_authorization_header
from rest_framework import exceptions

from rest_framework.permissions import IsAdminUser
from rest_framework.authtoken.models import Token

from user.models import Employee

class CustomTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        if get_authorization_header(request).split() == []:
            raise exceptions.AuthenticationFailed('No token provided')
        super().authenticate(request)

class CustomIsAdminUser(IsAdminUser):

    def has_permission(self, request, view):
        token = request.headers['Authorization'].split(" ")
        if not token: return False
        found_user = Token.objects.get(key=token[1]).user
        return found_user.is_staff