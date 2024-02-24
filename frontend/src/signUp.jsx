import { useState } from 'react'
import './all.css'
import { GoogleLogin } from '@react-oauth/google';


function Signup() {
  
  
  return (
      <div>
        <h1>Hello</h1>

        {/* google login button  */}
        <div>
            <GoogleLogin onSuccess= {
            credentialResponse=> {
            console.log(credentialResponse);
            }} 
            onError= { ()=> {
                console.log('Login Failed');
            }} />;
        </div>
      </div>
    );
  }

export default Signup
