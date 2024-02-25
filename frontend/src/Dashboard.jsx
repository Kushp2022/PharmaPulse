import { useState } from 'react'
import React from 'react';
import axios from 'axios';

function Dashboard() {

    const[servingsLeft, setServingsLeft] = useState();
    const[servingsPerDay, setServingsPerDay] = useState();
    function userMedications(event) {
        const info = event.target.value;
        let medications = info.split(",").map(medication => medication.trim());
        const fd = new FormData();
        medications.forEach((medication, index) => {
            fd.append(`medication`, medication);
        });
        // fd.append('servingsLeft', servingsLeft);
        // fd.append('servingsPerDay', servingsPerDay);

        //console.log(servingsLeft, servingsPerDay);
        axios.post('http://127.0.0.1:8000/medication_info/', fd,
        {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
        })
        .then(response => handleResponse(response))
        .catch(err => console.log(err))
    }

    function handleResponse(medication_info) {
        for(let drug in medication_info.data){
            console.log(drug);
            console.log(medication_info.data[drug]);
        }
    }

    return (
        <div>
            <h1>How Many Servings Do You Have Left?</h1>
            <label>
                Name:
                <input placeholder="Ex. 30" name="myInput" type="text"/>
            </label>

            <h1>How Many Servings Do You Take Per Day?</h1>
            <label>
                Name:
                <input placeholder="Ex. 1" name="myInput" type="text"/>
            </label>


            <h1>What Medications Do You Take?</h1>
            <label>
                Name:
                <input placeholder="Ex. ibuprofen, advil, etc..." name="myInput" type="text" onBlur={userMedications}/>
            </label>
        </div>
    );  
}


export default Dashboard