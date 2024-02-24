import { useState } from 'react'
import './all.css'
import { GoogleLogin } from '@react-oauth/google';



export default function signup() {
    return(
        <div>

            {/* google login button  */}
            <div> 
            <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            />;
            </div>

        </div>
    );
}

