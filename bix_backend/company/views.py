from rest_framework import viewsets
from auth.models import CustomTokenAuthentication
from .models import Company
from .serializers import CompanySerializer


class Company(viewsets.ModelViewSet):

    queryset = Company.objects.all()
    authentication_classes = [CustomTokenAuthentication]
    serializer_class = CompanySerializer
