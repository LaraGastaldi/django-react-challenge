from rest_framework import serializers
from company.serializers import CompanySerializer
from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.EmailField()
    name = serializers.CharField(max_length=100)
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(write_only=True)
    company = CompanySerializer(required=False)
    company_id = serializers.IntegerField(write_only=True)
    is_staff = serializers.BooleanField()

    class Meta:
        model = Employee
        fields = '__all__'