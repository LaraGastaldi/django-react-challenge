from rest_framework import viewsets
from auth.models import CustomTokenAuthentication
from .models import Employee
from .serializers import EmployeeSerializer

# from rest_framework.permissions import IsAdminUser
from auth.models import CustomIsAdminUser

class User(viewsets.ModelViewSet):

    queryset = Employee.objects.all()
    authentication_classes = [CustomTokenAuthentication]
    serializer_class = EmployeeSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'list':
            permission_classes = []
        else:
            permission_classes = [CustomIsAdminUser]
        return [permission() for permission in permission_classes]