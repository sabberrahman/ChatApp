import React from 'react';

const Login = () => {
    return (
       <div className="formContainer">
         <div className="formWrapper">
            <span className="logo">SabbyChat Application</span>
            <span className="title">Login</span>
            <form >
              <input type="email" placeholder='Email' />
              <input type="password" placeholder='Password' />
              <button>Sign in</button>
              <p>Dont have a account ? Register Now</p>
            </form>
         </div>
       </div>
    );
};

export default Login;