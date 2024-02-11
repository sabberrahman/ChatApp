import React from 'react';
import { LuImagePlus } from "react-icons/lu";

const Register = () => {
    return (
       <div className="formContainer">
         <div className="formWrapper">
            <span className="logo">SabbyChat Application</span>
            <span className="title">Register</span>
            <form >
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