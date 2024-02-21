import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../Firebase";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const {currentUser}=useContext(AuthContext);
    const  INITIAL_STATE ={
        charId:"null",
        user:{},
    }

    const chatReducer = (state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return {
                   user: action.payload,
                   chatId: currentUser.uid >action.payload.uid ? currentUser.uid +action.payload.uid :action.payload.uid + currentUser.uid , 
                };

            default : return state ; 
        }
    };

    const [ state , dispatch]=useReducer(chatReducer,INITIAL_STATE);

    return (
        <ChatContext.Provider value={{data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    );
};

//all child componet that we route w AuthContextProvider  will have access to currentUser--main.jsx 

    //AuthContextProvider-- is to wrapp all child componet
    //AuthContext-- is to wrap dynamic children componets and later to acccss data on child componet via-- useContext(AuthContext);
