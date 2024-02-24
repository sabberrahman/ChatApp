import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { db } from '../Firebase';
import { AuthContext } from '../context/AuthContext';

const Search = () => {
    const [username , setUsername ]=useState("");
    const [user, setUser]=useState(null)
    const [ err, setErr]=useState(false);
    const {currentUser}=useContext(AuthContext);

    const handleKey=(e)=>{
        e.code ==="Enter" && handleSearch();
    }

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", username)
        );

        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    setUser(doc.data());
                });
            } else {
                setErr(true);
            }
        } catch (err) {
            console.error("Error searching for user:", err);
            setErr(true);
        }
    }

    //NOT SHOWING --BUG FIX KORA AND THEN CLICKING WILL CREATE "CHATS"
    const handleSelect = async ()=>{
       //check wether the group/chatsin firestore exist , if not create 
       const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid ; 

       try {
        const res = await getDoc(doc(db,"chats",combinedId));

        if (!res.exists()) {
            //create a chat in chats database colloection
            await setDoc(doc(db , "chats", combinedId),{message:[]})

            //create user chats
            await updateDoc(doc(db,"userChats", currentUser.uid),{[combinedId+".userInfo"]:{
                uid:user.uid,
                displayName:user.displayName,
                photoURL:user.photoURL
            },[combinedId+".date"]:serverTimestamp()});

           // updating both ids togather
            await updateDoc(doc(db,"userChats", user.uid),{[combinedId+".userInfo"]:{
                uid:currentUser.uid,
                displayName:currentUser.displayName,
                photoURL:currentUser.photoURL
            },[combinedId+".date"]:serverTimestamp()});
        }

       } catch (err) {
        setErr(true)
       }
        setUsername("");
        setUser(null);

       
    }
   
return (
        //! not working doe 
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder='Find your Friend'
                 onChange={(e)=>setUsername(e.target.value)}
                 onKeyDown={(e)=>handleKey(e)}
                 value={username}/>
            </div>
            {err && <span>User is not Found!</span>}
           {user && <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL}alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    );
};
   

export default Search;