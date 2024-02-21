import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../Firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
    const [chats , setChats]=useState([]);

    const {currentUser}=useContext(AuthContext);
    const{dispatch}= useContext(ChatContext);

    //realtime data--
   useEffect(()=>{

    const getChats=()=>{
    const unsub = onSnapshot(doc(db,"userChats",currentUser.uid),(doc)=>{
    setChats(doc.data());
    }) 
    };
   
    return ()=>{unsub()};

    currentUser.uid && getChats();
   },[currentUser.uid])

   console.log(chats);// objects
   console.log(Object.entries(chats)); //array

    return (
        <div className="chats">
            {Object.entries(chats)?.map((chat)=>(
            
            <div className="userChat" key={chat[0]} onClick={handleSelect()}>
                <img src={chat[1].userInfo.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].userInfo.lastMessage?.text}</p>
                </div>
            </div>
            ))} 
           
        </div>
    );
};

export default Chats;