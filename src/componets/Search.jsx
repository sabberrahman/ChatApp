import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../Firebase';

const Search = () => {
    const [username , setUsername ]=useState("");
    const [user, setUser]=useState(null)
    const [ err, setErr]=useState(false);

    const handleKey=()=>{
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
   

    }
    return (
        //not working doe 
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder='Find your Friend' onChange={e=>setUsername(e.target.value)}  onKeyDown={handleKey}/>
            </div>
            {err && <span>User is not Found!</span>}
           {user && <div className="userChat">
                <img src={user.photoURL}alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    );
};

export default Search;