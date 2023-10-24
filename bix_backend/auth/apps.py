from django.apps import AppConfig
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


class AuthConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'auth'

    @staticmethod
    def login(username, password):
        user = authenticate(username=username, password=password)
        print(user)
        if user is not None:
            token = Token.objects.create(user=user)
            return {"user": user, "token": token.key}
        return False
