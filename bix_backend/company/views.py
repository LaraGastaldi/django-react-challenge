from rest_framework import viewsets
from auth.models import CustomTokenAuthentication
from .models import Company
from .serializers import CompanySerializer

from auth.models import CustomIsAdminUser

class Company(viewsets.ModelViewSet):

    queryset = Company.objects.all()
    authentication_classes = [CustomTokenAuthentication]
    serializer_class = CompanySerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = []
        else:
            permission_classes = [CustomIsAdminUser]
        return [permission() for permission in permission_classes]
