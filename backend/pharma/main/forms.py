# forms.py
from django import forms
from .models import Medication

class MedicationForm(forms.ModelForm):
    class Meta:
        model = Medication
        fields = ['medication', 'servingsLeft', 'servingsPerDay']
