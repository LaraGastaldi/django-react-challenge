from django.db import models
from company.models import Company
from django.contrib.auth.models import UserManager


class Employee(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    REQUIRED_FIELDS = []
    USERNAME_FIELD = 'username'
    PASSWORD_FIELD = 'password'
    is_anonymous = False
    is_authenticated = None
    is_active = True
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    def __str__(self):
        return {"id": self.id, "email": self.email, "username": self.username, "name": self.name, "company": self.company.name}

    def check_password(self, password):
        # SOLUÇÃO TEMPORÁRIA! NÃO FOI FEITO ENCRIPTAÇÃO!
        return password == self.password

    def set_password(self, password):
        self.password = password
