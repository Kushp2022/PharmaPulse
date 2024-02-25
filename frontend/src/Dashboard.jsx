import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Vector from './assets/Vector.svg';
import { Link } from 'react-router-dom';

function Dashboard() {;
    const[medication, setMedication] = useState('');
    const [daysRemaining, setDaysRemaining] = useState('');
    const [symptoms, setSymptoms] = useState([]);
    const [servingsLeft, setServingsLeft] = useState([]);
    const [servingPerDay, setServingPerDay] = useState([]);

     function handleServingsLeft(event) {
        const info = event.target.value;
        let servingLeft = info.split(",").map(servingLeft => parseInt(servingLeft.trim()));
        setServingsLeft(prevState => [...prevState, ...servingLeft]);
    } 
    function handleServingsPerDay(event) {
        const info = event.target.value;
        let servingsPerDay = info.split(",").map(servingsPerDay => parseInt(servingsPerDay.trim()));
        setServingPerDay(prevState => [...prevState, ...servingsPerDay]);
    }

    
    function userMedications(event) {
        const info = event.target.value;
        let medications = info.split(",").map(medication => medication.trim());
        console.log("medications: ", medications);
        console.log(servingsLeft);
        console.log(servingPerDay);
        if(medications.length != servingsLeft.length || medications.length != servingPerDay.length){
            alert("All fields must be same length");
            return;
        }
        const fd = new FormData();
        if(servingsLeft && servingPerDay){
            medications.forEach((medication, index) => {
                console.log(medication);
                fd.append(`medication`, medication);
                console.log(servingsLeft[index]);
                fd.append(`servingsLeft`, servingsLeft[index]);
                console.log(servingPerDay[index]);
                fd.append(`servingsPerDay`, servingPerDay[index]);
            });
        }
        console.log(fd);
        // axios.post('http://127.0.0.1:8000/medication_info/', fd,
        // {
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // }
        // })
        // .then(response => handleResponse(response))
        // .catch(err => console.log(err))
    }

function handleResponse(medication_info) {
    let allSymptoms = [];
    setMedication(Object.keys(medication_info.data)[0]);
    for (let drug in medication_info.data) {
        console.log("this is drug", drug);
        console.log(medication_info.data[drug]);
        setDaysRemaining(medication_info.data[drug]); 
        if (Array.isArray(medication_info.data[drug])) {
            allSymptoms = allSymptoms.concat(medication_info.data[drug]); // Concatenate the symptoms
                }
            }
            setSymptoms(allSymptoms); // Set the concatenated symptoms array
        } 

    return (
         <div className="relative w-full h-screen mainAppDiv">
            {/* Background SVG */}
            <img src={Vector} alt="Background SVG" className="absolute z-0 h-full object-cover right-[-13rem] top-14" />

            {/* Second main Div */}
            <div className="relative z-10">

                {/* Navbar */}
                <div className='w-full flex p-5 px-10 items-center'>
                    <h1 className='text-2xl anta-regular'><Link to="/">PharmaPulse</Link></h1>
                    <ul className='flex ml-auto'>
                        <li className='px-6 py-1 mt-1 text-lg font-sans'><Link to="/">Home</Link></li>
                        <li className='px-6 py-1 mt-1 text-lg font-sans'><Link to="/Pharmacy">Find a Pharmacy</Link></li>
                        <li className='px-6 py-1 mt-1 text-lg font-sans mr-3'><Link to="/shopping">Shopping Cart</Link></li>
                    </ul>
                </div>

                {/* main contenent div dividing two parts */}
                <div className="flex">

                    {/* Form and first half*/}
                    <div className='w-3/6 p-28 flex flex-col py-10 mt-20'>
                        <h1 className="text-cyan-800 font-sans text-2xl font-bold py-5">How Many Servings Do You Have Left?</h1>
                        <input className="bg-gray-200 text-black p-2 rounded-md mb-2" placeholder="Ex. 30" name="servingsLeft" type="text"  onBlur={handleServingsLeft}/>

                        <h1 className="text-cyan-800 font-sans text-2xl font-bold py-5">How Many Servings Do You Take Per Day?</h1>
                        <input className="bg-gray-200 text-black p-2 rounded-md mb-2" placeholder="Ex. 1" name="servingsPerDay" type="text" onBlur={handleServingsPerDay}/>

                        <h1 className="text-cyan-800 font-sans text-2xl font-bold py-5">What Medications Do You Take?</h1>
                        <input className="bg-gray-200 text-black p-2 rounded-md mb-2" placeholder="Ex. ibuprofen, advil, etc..." name="medications" type="text" onBlur={userMedications} />
                    </div>
                        
                    {/* Second half dispays info*/}
                    <div className="w-full p-20 pr-10 ml-24 flex items-center justify-center h-screen">
                        <div className="bg-stone-100 w-full h-5/6 rounded-2xl flex items-center p-10 mb-20 border border-gray-300 shadow-xl">
                            <h1 className=""></h1>
                                {medication && daysRemaining && symptoms && (
                                    <ul>
                                        <li>Medication: {medication}</li>
                                        <li>Symptoms:
                                           <ul className='p-2'>
                                                {symptoms.map((symptom, index) => (
                                                    <li key={index}>{symptom}</li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li>Days Remaining: {daysRemaining}</li>
                                    </ul>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard