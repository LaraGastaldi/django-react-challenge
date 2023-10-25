import json
from rest_framework.views import APIView

from rest_framework import authentication
from rest_framework.response import Response

from models import Employee


class User(APIView):

    def map_employee(self, employee):
        return {
            "email": employee.email,
                 "id": employee.id,
                 "name": employee.name,
                 "company": employee.company.name
        }


    authentication_classes = [authentication.TokenAuthentication]
    def post(self, request, id):
        pass

    def put(self, request, id):
        employee = Employee.objects.get(id=id)
        for attr, value in json.loads(request.body.decode('utf-8')).values():
            employee[attr] = value
        employee.save()

    def get(self):
        # return Response(Employee.objects.filter(company_id=request.GET.get('company_id')))
        return Response(map(self.map_employee, Employee.objects.all()))
