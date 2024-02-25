import { useState, useEffect } from 'react'
import React from 'react';
import axios from 'axios';
import Vector from './assets/Vector.svg';
import { Link } from 'react-router-dom';

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
        fd.append('servingsLeft', servingsLeft);
        fd.append('servingsPerDay', servingsPerDay);

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
         <div className="relative w-full h-screen mainAppDiv">
            {/* Background SVG */}
            <img src={Vector} alt="Background SVG" className="absolute z-0 h-full object-cover right-[-13rem] top-10" />

            {/* Second main Div */}
            <div className="relative z-10">

                {/* Navbar */}
                <div className='w-full flex p-5 px-10 items-center'>
                    <h1 className='text-2xl anta-regular'>PharmaPulse</h1>
                    <ul className='flex ml-auto'>
                        <li className='px-6 py-1 mt-1 text-lg font-sans'><Link to="/">Home</Link></li>
                        <li className='px-6 py-1 mt-1 text-lg font-sans'><Link to="/Pharmacy">Find a Pharmacy</Link></li>
                        <li className='px-6 py-1 mt-1 text-lg font-sans mr-3'><Link to="/">Shopping Cart</Link></li>
                    </ul>
                </div>

                {/* main contenent div dividing two parts */}
                <div className="flex">

                    {/* Form and first half*/}
                    <div className='w-3/6 p-28 flex flex-col py-10 mt-20'>
                        <h1 className="text-cyan-800 font-sans text-2xl font-bold py-5">How Many Servings Do You Have Left?</h1>
                        <input className="bg-gray-200 text-black p-2 rounded-md mb-2" placeholder="Ex. 30" name="servingsLeft" type="text"  onBlur={(event) => setServingsLeft(event.target.value)}/>

                        <h1 className="text-cyan-800 font-sans text-2xl font-bold py-5">How Many Servings Do You Take Per Day?</h1>
                        <input className="bg-gray-200 text-black p-2 rounded-md mb-2" placeholder="Ex. 1" name="servingsPerDay" type="text" onBlur={(event) => setServingsPerDay(event.target.value)}/>

                        <h1 className="text-cyan-800 font-sans text-2xl font-bold py-5">What Medications Do You Take?</h1>
                        <input className="bg-gray-200 text-black p-2 rounded-md mb-2" placeholder="Ex. ibuprofen, advil, etc..." name="medications" type="text" onBlur={userMedications} />
                    </div>
                        
                    {/* Second half dispays info*/}
                    <div className="w-full p-20 pr-10 ml-24 flex items-center justify-center h-screen">
                        <div className="bg-stone-100 w-full h-5/6 rounded-2xl flex items-center p-10 mb-20 border border-gray-300 shadow-xl">
                            <h1 className="text-bold">Your info Goes here</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard