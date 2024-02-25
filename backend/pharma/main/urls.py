# main -> urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    #path("side_effects/", views.side_effect, name='side_effect'),
    path("pharmacy_location/", views.pharmacy_location, name='pharmacy_location'),
    path("medication_info/", views.medication_info, name="medication_info")
]