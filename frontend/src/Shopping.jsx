import React, { useState } from 'react';
import './all.css'
import { GoogleLogin } from '@react-oauth/google';
import Group from './assets/Group.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Shopping() {
    const [tasks,setTasks] = useState([]);
    const [task,setTask] = useState("");

    const addTasks = () => {
        if(task !== ""){
        setTasks([...tasks,task])
        setTask("");
        console.log(tasks);
        }
    }

    const deleteTasks = (index) => {
        const updatedList = [...tasks];
        console.log('Automatic...')
        // delete updatedList[index];
        updatedList.splice(index,1)
        setTasks(updatedList)
    }

    return (
        <div className="">
            {/* Background SVG */}
            <div className="absolute inset-0 z-0 w-7/12 mr-auto flex item-center justify-center">
                <img src={Group} alt="Background SVG" className="absolute z-0 h-auto mr-40 w-9/12 mt-40 object-cover" />
            </div>

            {/* Navbar */}
            <div className='w-full flex p-5 px-10 relative z-10'>
                <h1 className='text-2xl anta-regular'><Link to="/">PharmaPulse</Link></h1>
                <ul className='flex ml-auto'>
                    <li className='px-6 py-1 mt-1 text-lg font-sans'><Link to="/dashboard">Home</Link></li>
                    <li className='px-6 py-1 mt-1 text-lg font-sans'><Link to="/Pharmacy">Find a Pharmacy</Link></li>
                    <li className='px-6 py-1 mt-1 text-lg font-sans mr-3'><Link to="/Shopping">Shopping Cart</Link></li>
                </ul>
            </div>

            {/* Leftside Container */}
            <div className="ml-auto w-1/2 h-screen flex items-center justify-center">
                <div className=" flex flex-col items-center mb-60">
                    <h1 className=" text-4xl m-16 font-bold">Your Shopping Cart! </h1>
                <div className="p-6">
                    <input className=" bg-slate-100 rounded-md p-4 m-4" 
                    type="text"
                    value={task}
                    onChange = {(e)=>{
                    setTask(e.target.value);
                    }}
                    placeholder="Add a item to your cart..."
                    />
                    <button onClick={addTasks} 
                    className=" bg-green-500 text-white p-3 m-3 rounded-md font-bold hover:bg-green-600">Add Item</button>
                </div>
                <div style={{ maxHeight: 'calc(100vh - 500px)', overflowY: 'auto' }}>
                    {tasks?.length > 0 ? (
                        <ul>
                            {
                            tasks.map((task,index)=>(
                                <div className=" flex bg-slate-100 m-4 py-4 pl-12 pr-4 rounded-md" key={index}>
                                <li className="self-center font-semibold pr-10 mr-6 grow">{task}</li>
                                <button onClick={()=>{deleteTasks(index)}} 
                                className=" bg-red-500 text-white p-2 mx-1 rounded-md font-bold hover:bg-red-600">Delete</button>
                                </div>
                            ))
                            }
                        </ul>
                    ):(
                        <div>
                        <p>Shopping Cart Empty</p>
                        </div>
                    ) }
                </div>
                </div>
            </div>
            <div className=' w-1/6 mr-60 ml-auto ' style={{ position: 'relative', bottom: '10rem' }}>
                <button className='mr-auto p-3 rounded-xl text-xl bg-green-500 text-white'>Text My Shopping Cart!</button>
            </div>
            
        </div>
    );
}

export default Shopping;
