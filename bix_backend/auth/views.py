import json

from .apps import AuthConfig

from django.http import HttpResponse
from django.views import View


from pprint import pprint

from user.serializers import EmployeeSerializer
from rest_framework import serializers


class Login(View):
    def post(self, request):
        body = json.loads(request.body)
        user = AuthConfig.login(body["username"], body["password"])
        if not user:
            return HttpResponse(json.dumps({"error": "Invalid credentials"}), status=401)
        return HttpResponse(json.dumps({"user": EmployeeSerializer(user['user']).data, "token": user['token']}), status=201)
