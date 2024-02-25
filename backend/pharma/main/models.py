from django.db import models

# Create your models here.
# models.py
from django.db import models

class Medication(models.Model):
    name = models.CharField(max_length=100)
    servingsLeft = models.IntegerField()
    servingsPerDay = models.IntegerField()
