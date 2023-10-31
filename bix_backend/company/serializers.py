from rest_framework import serializers
from .models import Company

class CompanySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=150)

    class Meta:
        model = Company
        fields = '__all__'
