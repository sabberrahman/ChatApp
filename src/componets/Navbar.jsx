import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { auth } from '../Firebase';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const {currentUser}=useContext(AuthContext);
    return (
        <div className='navbar'>
            <div className="logo">sabbychat</div>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>LogOut</button>
            </div>
        </div>
    );
};

export default Navbar;