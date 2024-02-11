import React from 'react';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="logo">sabbychat</div>
            <div className="user">
                <img src="https://images.pexels.com/photos/6747320/pexels-photo-6747320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <span>sabber</span>
                <button>LogOut</button>
            </div>
        </div>
    );
};

export default Navbar;