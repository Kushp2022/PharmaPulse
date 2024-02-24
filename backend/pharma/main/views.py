# main -> views.py
from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def home(request):
    return HttpResponse("Hello World!")

@csrf_exempt
def pharmacy(request):
    return HttpResponse("Connected to our backend")
