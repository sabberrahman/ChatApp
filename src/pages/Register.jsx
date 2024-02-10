import React from 'react';

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
              <input type="file" placeholder='Upload File'/>
              <button>Sign up</button>
              <p>Do you have a account Already?Login</p>
            </form>
         </div>
       </div>
    );
};

export default Register;