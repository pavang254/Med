from django.db import models
from django import forms
from django.contrib.postgres.fields import ArrayField
# Create your models here.

class ChoiceArrayField(ArrayField):
    """
    A field that allows us to store an array of choices.
    Uses Django's Postgres ArrayField
    and a MultipleChoiceField for its formfield.
    """

    def formfield(self, **kwargs):
        defaults = {
            'form_class': forms.MultipleChoiceField,
            'choices': self.base_field.choices,
        }
        defaults.update(kwargs)
        # Skip our parent's formfield implementation completely as we don't
        # care for it.
        # pylint:disable=bad-super-call
        return super(ArrayField, self).formfield(**defaults)

TIMINGS_CHOICES = (
        ('morning', 'Morning'),
        ('afternoon', 'Afternoon'),
        ('night', 'Night')
    )

class Tablet(models.Model):
    
    name = models.CharField(max_length=50)
    timings = ChoiceArrayField(models.CharField(max_length=200,blank=True, choices=TIMINGS_CHOICES), default=list,blank=True)
    strength = models.PositiveSmallIntegerField(default=0)
    # status = models.BooleanField()

    def __str__(self) -> str:
        return self.name

class Record(models.Model):

    date = models.DateTimeField(auto_now_add=True)
