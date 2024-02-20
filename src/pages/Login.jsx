import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';

const Login = () => {
  const [err,setErr]=useState(false);
  const navigate = useNavigate();

  const handleSubmit =async(e)=>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email,password);
      navigate("/");
      
    } catch (err) {
      setErr(true);
    }
    
  }
    return (
       <div className="formContainer">
         <div className="formWrapper">
            <span className="logo">SabbyChat Application</span>
            <span className="title">Login</span>
            <form onSubmit={(e)=>handleSubmit(e)} >
              <input type="email" placeholder='Email' />
              <input type="password" placeholder='Password' />
              <button>Sign in</button>
              {err && <span>Something went wrong</span>}
              <p> You Dont have a account ? <Link to="/register">Register Now</Link> </p>
            </form>
         </div>
       </div>
    );
};

export default Login;