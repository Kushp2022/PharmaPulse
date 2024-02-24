# main -> urls.py
from django.urls import path
from . import views

urlpatterns = [
    #path("", views.home, name="home"),
    path("pharmacies/", views.pharmacy, name='pharmacy')
]