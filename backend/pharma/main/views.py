# main -> views.py
from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import requests
import googlemaps 
import time
import logging

def miles_to_meters(miles):
    try:
        return miles * 1609.344
    except:
        return 16000

# Create your views here.
def home(request):
    return HttpResponse("Hello World!")

def pharmacy_location(request):
    url = 'https://places.googleapis.com/v1/places:searchText'
    headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': 'AIzaSyBCyHgxiac8jCmqKSEoDOKIlj4hd5l4__U',
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress'
    }
    data = {
        "textQuery": "Pharmacies near me",
        "openNow": True,
        "maxResultCount": 10,
        "locationBias": {
            "circle": {
                "center": {"latitude": 39.1893681, "longitude": -96.5899102},
                "radius": 15000
            }
        }
    }
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return JsonResponse(data)
    
    return HttpResponse(f"Error: {response.status_code}")


@csrf_exempt
def side_effect(medications):
    side_effects = {}
    for drug_name in medications.values():
        side_effects[drug_name] = []
        api_url = f'https://api.fda.gov/drug/event.json?api_key=BMGXMyehl1VVJzypcbKlbBWRsspTLqu997FBiMSK&search=patient.drug.openfda.brand_name:{drug_name}&count=patient.reaction.reactionmeddrapt.exact&limit=10'
        response = requests.get(api_url)
        if response.status_code == 200:
            data = response.json()
            for effect in data['results']:
                side_effects[drug_name].append(effect['term'])

    return side_effects

def medicine_empty(servingsLeft, servingsPerDay):
    return servingsLeft // servingsPerDay

@csrf_exempt
def medication_info(request):
    logging.debug('Medication info called')
    medications = []
    servingsLeft = None
    servingsPerDay = None

    if request.method == "POST":
        logging.debug("in post request")
        for key, value in request.POST.items():
            if key == 'medication':
                medications.append(value)
            elif key == 'servingsLeft':
                servingsLeft = value
            elif key == 'servingsPerDay':
                servingsPerDay = value

        # Now you have all the medications, servingsLeft, and servingsPerDay
        side_effects = side_effect(medications)
        days_remaining = medicine_empty(servingsLeft, servingsPerDay)
        side_effects['days_remaining'] = days_remaining

        return JsonResponse(side_effects)
    
    # if request.method == "GET":
    #     logging.debug("in get reqeuest")
    #     return JsonResponse({"GET: ", "Get request idk why"})

    return JsonResponse({"Medication Info": "MEDICATION INFO", "Here: ": request.method})