import React from 'react';
import { LuImagePlus } from "react-icons/lu";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../Firebase"

const Register = () => {

  const handleSubmit=(e)=>{
    e.preventDefault();
    const displayName= e.target[0].value;
    const email= e.target[1].value;
    const password= e.target[2].value;
    const file= e.target[3].files;
  }

  
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    return (
       <div className="formContainer">
         <div className="formWrapper">
            <span className="logo">SabbyChat Application</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder='Display Username' />
              <input type="email" placeholder='Email' />
              <input type="password" placeholder='Password' />
              <input type="file" style={{display:"none"}} id='file'/>
              <label htmlFor="file">
              <LuImagePlus style={{fontSize:"1.5rem"}}/>
                <span>Upload profile  </span></label>
              <button>Sign up</button>
              <p>Do you have a account Already?Login</p>
            </form>
         </div>
       </div>
    );
};

export default Register;
//  console.log(e.target[0].value)












