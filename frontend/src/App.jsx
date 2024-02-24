import { useState } from 'react'
import './App.css'
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);

  // axios.get('http://127.0.0.1:8000/side_effects/')
  //   .then(response => {
  //     console.log(response.data); 
  //   })
  //   .catch(error => {
  //     console.error('Error:', error); 
  // });
  axios.get('http://127.0.0.1:8000/pharmacy_location/')
    .then(response => {
      console.log(response.data); 
    })
    .catch(error => {
      console.error('Error:', error); 
  });
  
  return (
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
  )
}

export default App
