from django.db import models

# Create your models here.

class Tablet(models.Model):
    timings = (
        ('morning', 'Morning'),
        ('afternoon', 'Afternoon'),
        ('night', 'Night')
    )
    name = models.CharField(max_length=50)
    # status = models.BooleanField()
    timing = models.CharField(max_length=15, choices=timings)