from django.forms import ModelForm
from .models import Tablet

class createPrescription(ModelForm):
    class Meta:
        model = Tablet
        fields = '__all__'