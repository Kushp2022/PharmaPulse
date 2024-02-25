import React, { useState, useEffect, useRef } from 'react';
import './all.css'
import { GoogleLogin } from '@react-oauth/google';
import WannaUseSvg from './assets/homeScreen.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Shopping() {

  return (
      <div className="relative mainAppDiv">
        {/* Background SVG */}
        <div className="absolute inset-0 z-0">
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


      </div>
    );
  }

export default Shopping
