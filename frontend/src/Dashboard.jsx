import { useState, useEffect } from 'react'
import React from 'react';
import axios from 'axios';

function Dashboard() {
    
    const[servingsLeft, setServingsLeft] = useState();
    const[servingsPerDay, setServingsPerDay] = useState();
    const[longitude, setLongitude] = useState();
    const[latitude, setLatitude] = useState();

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

    const getPharmacies = () => {
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
            .catch(err => console.log(err))
        }
    }

    function userMedications(event) {
        const info = event.target.value;
        let medications = info.split(",").map(medication => medication.trim());
        const fd = new FormData();
        medications.forEach((medication, index) => {
            fd.append(`medication`, medication);
        });
        fd.append('servingsLeft', servingsLeft);
        fd.append('servingsPerDay', servingsPerDay);
        axios.post('http://127.0.0.1:8000/medication_info/', fd,
        {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
        })
        .then(response => handleResponse(response))
        .catch(err => console.log(err))
    }

    function handleResponse(info) {
        console.log(info);
    }

    useEffect(() => {
        findMyState(); // This will be called once when the component mounts
    }, []); 

    return (
        <div className='dash'>

            <h1>How Many Servings Do You Have Left?</h1>
            <label>
                Name:
                <input placeholder="Ex. 30" name="myInput" type="text"  onBlur={(event) => setServingsLeft(event.target.value)}/>
            </label>

            <h1>How Many Servings Do You Take Per Day?</h1>
            <label>
                Name:
                <input placeholder="Ex. 1" name="myInput" type="text"  onBlur={(event) => setServingsPerDay(event.target.value)}/>
            </label>


            <h1>What Medications Do You Take?</h1>
            <label>
                Name:
                <input placeholder="Ex. ibuprofen, advil, etc..." name="myInput" type="text" onBlur={userMedications}/>
            </label>

            <button style={{marginTop:"20px"}} onClick={getPharmacies}>Find Pharmacies Near Me</button>
        </div>
    );  
}


export default Dashboard