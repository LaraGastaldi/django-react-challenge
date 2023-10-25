from django.db import models
from company.models import Company


class Employee(models.Model):
    # user = models.oneToOneField(User, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    email = models.EmailField()
    name = models.CharField(max_length=100)

    def __str__(self):
        return {"id": self.id, "email": self.email, "name": self.name, "company": self.company.name}
