# main -> views.py
from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import requests
import googlemaps 
import time
import logging, json

def miles_to_meters(miles):
    try:
        return miles * 1609.344
    except:
        return 16000

# Create your views here.
def home(request):
    return HttpResponse("Hello World!")

@csrf_exempt
def pharmacy_location(request):
    longitude = None
    latitude = None
    if request.method == "POST":
        try:
            latitude = request.POST.get("latitude")
            longitude = request.POST.get("longitude")
            if longitude and latitude:    
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
                            "center": {"latitude": latitude, "longitude": longitude},
                            "radius": 1500
                        }
                    }
                }
                response = requests.post(url, json=data, headers=headers)
                if response.status_code == 200:
                    pharmacies =  response.json()
                    return JsonResponse(pharmacies)
                else:
                        return JsonResponse({"Error": "Failed to retrieve pharmacies","Data: ": response.json()})
            else:
                return JsonResponse({"Error": "Latitude or longitude is missing", "Data: ": request.POST})
        except json.JSONDecodeError:
            return JsonResponse({"Error": "Invalid JSON data", "Lat: ": request.POST.get("latitude"), "Long: ": request.POST.get("longitude") })
    else:
        return JsonResponse({"Error": "Invalid request method", "Method: ": request.method})


@csrf_exempt
def side_effect(medications):
    side_effects = {}
    for drug_name in medications:
        side_effects[drug_name] = []
        api_url = f'https://api.fda.gov/drug/event.json?api_key=BMGXMyehl1VVJzypcbKlbBWRsspTLqu997FBiMSK&search=patient.drug.openfda.brand_name:{drug_name}&count=patient.reaction.reactionmeddrapt.exact&limit=10'
        response = requests.get(api_url)
        if response.status_code == 200:
            data = response.json()
            for effect in data['results']:
                side_effects[drug_name].append(effect['term'])

    return side_effects

def medicine_empty(servingsLeft, servingsPerDay):
    return int(servingsLeft) //int(servingsPerDay)

@csrf_exempt
def medication_info(request):
    medications = []
    side_effects = {}
    servingsLeft = None
    servingsPerDay = None
    if request.method == "POST":
        for key, value in request.POST.items():
            if key == 'medication':
                medications.append(value)
            elif key == 'servingsLeft':
                servingsLeft = value
            elif key == 'servingsPerDay':
                servingsPerDay = value
        # Now you have all the medications, servingsLeft, and servingsPerDay
        if servingsLeft is not None and servingsPerDay is not None:
            side_effects = side_effect(medications)
            days_remaining = medicine_empty(servingsLeft, servingsPerDay)
            side_effects['days_remaining'] = days_remaining

            return JsonResponse(side_effects)
        else:
            return JsonResponse({"error": "servingsLeft and servingsPerDay are required"}, status=400)
    
    if request.method == "GET":
        logging.debug("in get reqeuest")
        return JsonResponse({"GET: ": "Get request idk why"})

   # return JsonResponse({"Medication Info": "MEDICATION INFO", "Here: ": request.method})