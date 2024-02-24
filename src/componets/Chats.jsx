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
    useEffect(() => {
        let unsub; // Declare unsub variable in the outer scope
    
        const getChats = () => {
            unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });
        };
    
        // Call getChats conditionally inside the useEffect
        if (currentUser.uid) {
            getChats();
        }
    
        // Return the cleanup function
        return () => {
            // Ensuring unsub is defined before calling it
            if (unsub) {
                unsub();
            }
        };
    }, [currentUser.uid]);
    

   console.log(chats);// objects
   console.log(Object.entries(chats)); //array

   const handleSelect=(u)=>{
     dispatch({type: "CHANGE_USER", payload: u})
   }

    return (
        <div className="chats">
            {Object.entries(chats)?.sort((a,b)=> b[1].date-a[1].date).map((chat)=>(
            
            <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
                <img src={chat[1].userInfo.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                </div>
            </div>
            ))} 
           
        </div>
    );
};

export default Chats;