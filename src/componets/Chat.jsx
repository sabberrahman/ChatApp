import React from 'react';
import { FaVideo } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import Messages from './Messages';
import Input from './Input';

const Chat = () => {
    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>Sabber</span>
                <div className="chatIcons">
                <FaVideo style={{color:"white", fontSize:"1.3rem"}}/>
                <RiContactsFill style={{color:"white", fontSize:"1.3rem"}}/>
                <BsThreeDots style={{color:"white", fontSize:"1.3rem"}}/>
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    );
};

export default Chat;