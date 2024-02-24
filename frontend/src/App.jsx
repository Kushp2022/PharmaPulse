import { useState } from 'react'
import './all.css'
import { GoogleLogin } from '@react-oauth/google';
import WannaUseSvg from './assets/homeScreen.svg';
import { Link } from 'react-router-dom';

import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
    // axios.get('http://127.0.0.1:8000/side_effects/')
  //   .then(response => {
  //     console.log(response.data); 
  //   })
  //   .catch(error => {
  //     console.error('Error:', error); 
  // });
  // axios.get('http://127.0.0.1:8000/pharmacy_location/')
  //   .then(response => {
  //     console.log(response.data); 
  //   })
  //   .catch(error => {
  //     console.error('Error:', error); 
  // });
  
  return (
      <div className="relative mainAppDiv">
        {/* Background SVG */}
        <div className="absolute inset-0 z-0">
          <img src={WannaUseSvg} alt="Background SVG" className="w-full h-full object-cover picture" />
        </div>

        {/* Navbar */}
        <div className='w-full flex p-5 px-10 relative z-10'>
          <h1 className='text-2xl anta-regular'>PharmaPulse</h1>
          <ul className='flex ml-auto'>
            <li className='px-6 py-1 mt-1 text-lg font-sans'>Home</li>
            <li className='px-6 py-1 mt-1 text-lg font-sans'>About Us</li>
            <li className='px-6 py-1 mt-1 text-lg font-sans mr-3'>Contact Us</li>
          </ul>
          <Link to="/signup">
          <button className='m-2 ring-2 ring-blue-500 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900 bg-white px-3 rounded-lg font-sans hover:bg-blue-500'> Sign Up </button>
          </Link>
        </div>

        {/* Main container under navbar Left Side */}
        <div className='flex flex-col items-center justify-center w-6/12 h-screen z-10 p-20'>
            <h1 className='text-5xl mr-auto py-5 font-sans font-bold text-blue-900'>PharmaPulse</h1>
            <h1 className='text-4xl roboto-mono-kp text-cyan-700 pb-50'>Navigate Medication with Confidence</h1>
            <button className='mt-10 mr-auto m-2 ring-2 ring-blue-500 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900 bg-white px-3 rounded-lg font-sans hover:bg-blue-500'> Sign Up </button>
        </div>

      </div>
    );
  }

export default App
