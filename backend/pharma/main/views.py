# main -> views.py
from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from twilio.rest import Client
import requests
import googlemaps 
import time
import json

def miles_to_meters(miles):
    try:
        return miles * 1609.344
    except:
        return 16000

# Create your views here.
def home(request):
    return HttpResponse("Hello World!")

@csrf_exempt
def send_text(request):
    account_sid = '{you_account_sid}'
    auth_token = '{your_auth_token}'
    client = Client(account_sid, auth_token)
    PHONE_NUM = '+18447345883'
    user_num = '+1'
    if request.method == "POST":
        num = request.POST.get("number")
        user_num += str(num)
        tasks = request.POST.getlist("tasks[]")
        task_string = "\n".join(tasks)
        print(user_num)
        print(task_string)
        message = client.messages.create(
            from_='+18557730607',
            body = f"Here's Your Shopping List: \n{task_string}",
            to=f'{user_num}'
        )
        print(message.sid)
        if message.sid:
            return JsonResponse({"status": "Message sent successfully", "message": f"{task_string}", "sent_to": f'{user_num}'})
        else:
            return JsonResponse({"status": "Failed to send message"})
    else:
        return JsonResponse({"Some Fun": request.method})

@csrf_exempt
def get_drug_info(request):
    if request.method == "GET":
        return JsonResponse({"medications": MEDICINES, "days_remaining": DAYS_REMAINING})
    return JsonResponse({"Not a Get": request.method})

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
                    'X-Goog-Api-Key': '{your_api_key}',
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
    days_left = []
    for i in range(len(servingsLeft)):
        days_left.append(servingsLeft[i] // servingsPerDay[i])

    return days_left

@csrf_exempt
def medication_info(request):
    global MEDICINES, DAYS_REMAINING
    medications = []
    side_effects = {}
    servingsLeft = []
    servingsPerDay = []
    if request.method == "POST":
        medications = request.POST.getlist('medication')
        servingsLeft = list(map(int, request.POST.getlist('servingsLeft')))
        servingsPerDay = list(map(int, request.POST.getlist('servingsPerDay')))
        # Now you have all the medications, servingsLeft, and servingsPerDay
        if servingsLeft is not None and servingsPerDay is not None:
            side_effects = side_effect(medications)
            days_remaining = medicine_empty(servingsLeft, servingsPerDay)
            MEDICINES = medications
            DAYS_REMAINING = days_remaining
            side_effects['days_remaining'] = days_remaining
            return JsonResponse(side_effects)
        else:
            return JsonResponse({"error": "servingsLeft and servingsPerDay are required"}, status=400)
    
    if request.method == "GET":
        return JsonResponse({"GET: ": "Get request idk why"})

   # return JsonResponse({"Medication Info": "MEDICATION INFO", "Here: ": request.method})