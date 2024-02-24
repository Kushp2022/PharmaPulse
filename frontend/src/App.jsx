import { useState } from 'react'
import './App.css'
import { GoogleLogin } from '@react-oauth/google';


function App() {
  const [count, setCount] = useState(0)

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
