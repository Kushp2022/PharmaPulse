import { useState, useEffect } from 'react'
import React from 'react';
import axios from 'axios';

function Pharmacy() {
    const[longitude, setLongitude] = useState();
    const[latitude, setLatitude] = useState();
    const [loading, setLoading] = useState(false);
    const[map, setMap] = useState(false);
    const[locations, setLocations] = useState([])
    const findMyState = () => {
        const status = document.querySelector('.status');
        const success = (position) => {
            console.log(position);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        }

        const error = () => {
            status.textContent = 'Unable to retrieve your location';
        }
        navigator.geolocation.getCurrentPosition(success, error);
        console.log(latitude, longitude);
    }

    const geocodeAddress = async (address) => {
        try {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBCyHgxiac8jCmqKSEoDOKIlj4hd5l4__U`);
          if (response.data.results && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return { latitude: location.lat, longitude: location.lng };
          } else {
            console.error('No results found for the address:', address);
            return null;
          }
        } catch (error) {
          console.error('Error geocoding the address:', error);
          return null;
        }
      };

    const getPharmacies = () => {
        setLoading(true);
        if(latitude && longitude){
            console.log(longitude, latitude)
            const fd = new FormData();
            fd.append('latitude', latitude);
            fd.append('longitude', longitude);
            axios.post('http://127.0.0.1:8000/pharmacy_location/', fd,
            {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
            })
            .then(response => handleResponse(response))
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
        }
    }

    function handleResponse(pharmacy) {
        setLoading(false);
        setMap(true);
        let pharmacies = [];
        let pharmacy_names = [];
        let locationsPromises = [];
        for(const place of pharmacy.data['places']){
            pharmacy_names.push(place['displayName']['text']);
            pharmacies.push(place['formattedAddress'])
            locationsPromises.push(geocodeAddress(place['formattedAddress']));
        }
        
        Promise.all(locationsPromises)
            .then((resolvedLocations) => {
                setLocations(resolvedLocations); 
                initMap(pharmacy_names, resolvedLocations);
            })
            .catch((error) => {
                console.error('Error geocoding addresses:', error);
            });
    }

    const initMap = (pharmacy_names, resolvedLocations) => {
        const map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: { lat: latitude, lng: longitude },
        });

        resolvedLocations.forEach((location, index) => {
            new window.google.maps.Marker({
                position: { lat: location.latitude, lng: location.longitude },
                map: map,
                title: pharmacy_names[index],
            });
        });
    }
        
    useEffect(() => {
        findMyState(); 
        getPharmacies();
    }, []); 

    return (
        <div>
            <button style={{marginTop:"20px"}} onClick={getPharmacies}>Find Pharmacies Near Me</button>
            {loading && <p>Loading...</p>}
            {map && <div id="map" style={{ marginTop:'52px', height: '700px', width: '100%' }}></div>}
        </div>
    );
}

export default Pharmacy