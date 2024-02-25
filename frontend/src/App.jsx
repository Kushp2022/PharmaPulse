import React, { useState, useEffect, useRef } from 'react';
import './all.css'
import { GoogleLogin } from '@react-oauth/google';
import WannaUseSvg from './assets/homeScreen.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import aboutus from './assets/aboutus.svg';
import kp from './assets/kp.png';
import kr from './assets/kr.png';
import { Link as ScrollLink, Element } from 'react-scroll';


import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)

  const navigate = useNavigate();
  const textRef = useRef(null);
  const [textContent, setTextContent] = useState(''); // Initialize with your desired text

  // Handle successful login
  const handleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    navigate('/dashboard');
  };

  // Handle login failure
  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div>
      {/* start page */}
      <div className="relative mainAppDiv">

        {/* Background SVG */}
        <div className="absolute inset-0 z-0">
          <img src={WannaUseSvg} alt="Background SVG" className="w-full h-full object-cover picture" />
        </div>

        {/* Navbar */}
        <div className='w-full flex p-5 px-10 relative z-10'>
          <h1 className='text-2xl anta-regular'><Link to="/">PharmaPulse</Link></h1>
          <ul className='flex ml-auto'>
            <li className='px-6 py-1 mt-1 text-lg font-sans'><ScrollLink to="aboutUs" smooth={true} duration={500}>About Us</ScrollLink></li>
            <li className='px-6 py-1 mt-1 text-lg font-sans mr-3'><ScrollLink to="contactUs" smooth={true} duration={500}>Contact Us</ScrollLink></li>
          </ul>
          <button className='m-2 ring-2 ring-blue-500 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900 bg-white px-3 rounded-lg font-sans hover:bg-blue-500'> Log In</button>
        </div>

        {/* Main container under navbar Left Side */}
        <div className='flex flex-col items-center justify-center w-6/12 h-screen z-10 p-20'>
          <h1 className='text-5xl mr-auto py-5 font-sans font-bold text-blue-900'>PharmaPulse</h1>
          <h1 className='text-4xl roboto-mono-kp text-cyan-700 pb-50'>Navigate Medication with Confidence</h1>

          {/* google login button  */}
          <div className='pr-96 pt-10'>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        </div>
      </div>

      {/* about us */}
      <Element name="aboutUs">
      <div className='w-full h-screen' >

        {/* main div bottom */}
        <div className='flex'>

          {/* left half */}
          <div className=' w-full h-screen'>
              <img src={aboutus} alt="Background SVG" className="m-10 w-full h-auto object-cover picture" style={{ position: 'relative', right:'23rem' }}/>
          </div>

          {/* right half */}
          <div className=' w-full h-screen flex flex-col'>
            <h1 className='text-5xl pl-20 py-5 mt-72 font-sans font-bold'>About Us</h1>
            <p className='px-20 font-sans text-xl'>Welcome to <span className="anta-regular">PharmaPulse</span>, your one-stop destination for medication information and pharmacy location services. Our platform simplifies the process of understanding medication side effects and helps you find nearby pharmacies with ease. Empowering you to make informed decisions about your health, we're dedicated to simplifying your medication journey. Join us on our mission to promote health literacy and improve access to vital healthcare resources.</p>
          </div>
        </div>

      </div>
    </Element>
    <Element name="contactUs">
      {/* contact us */}
      <div className='w-full h-screen'>
        <div className='flex justify-center items-center'>

          {/* Kush left side */}
          <div className='flex flex-col justify-center items-center w-1/2 h-screen'>
            <img src={kp} alt="Background SVG" className="w-7/12 mr-80 h-auto object-cover picture rounded-xl" />
            <h1 className='text-3xl pt-3 anta-regular'>Kush Patel</h1>
            <h1 className='text-2xl anta-regular'>Linkedin - linkedin.com/in/kushp839</h1>
          </div>
          
          {/* Kevin right side */}
          <div className='flex flex-col justify-center items-center w-1/2 h-screen'>
            <img src={kr} alt="Background SVG" className="w-7/12 mr-80 h-auto object-cover picture rounded-xl" />
            <h1 className='text-3xl pt-3 anta-regular'>Kevin Roy</h1>
            <h1 className='text-2xl anta-regular'>Linkedin - linkedin.com/in/kevin-roy-a23627220</h1>
          </div>
        </div>
      </div>
      </Element>
    </div>
  );
}

export default App;
