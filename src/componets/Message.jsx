import React from 'react';

const Message = () => {
    return (
        <div className='message owner'>
            <div className="messageInfo">
                <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
                <span>just now</span>

            </div>
            <div className="messageContent">
                <p>hello ki koren</p>
                <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
            </div>
        </div>
    );
};

export default Message;