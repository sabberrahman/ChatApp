import React, { useState } from 'react';
import { LuImagePlus } from "react-icons/lu";
import { getAuth, createUserWithEmailAndPassword ,updateProfile } from "firebase/auth";
import {auth , storage} from "../Firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

const Register = () => {
  const [err,setErr]=useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
    
      const storageRef = ref(storage, user.displayName); // Use user's displayName
    
      const uploadTask = uploadBytesResumable(storageRef, file);
    
      uploadTask.on(
        "state_changed", // changed to state_changed
        (snapshot) => {
          // Handle progress
        },
        (error) => {
          // Handle unsuccessful uploads
          setErr(true); 
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref); // Await for downloadURL
          await updateProfile(user, {
            displayName: user.displayName, // Use user's displayName
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid, 
            displayName: user.displayName, // Use user's displayName
            email: user.email, // Use user's email
            photoURL: downloadURL,
          });
        }
      );
      // Handle success
  } catch (err) {
      setErr(true)
  }
}
    return (
       <div className="formContainer">
         <div className="formWrapper">
            <span className="logo">SabbyChat Application</span>
            <span className="title">Register</span>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input type="text" placeholder='Display Username' />
              <input type="email" placeholder='Email' />
              <input type="password" placeholder='Password' />
              <input type="file" style={{display:"none"}} id='file'/>
              <label htmlFor="file">
              <LuImagePlus style={{fontSize:"1.5rem"}}/>
                <span>Upload profile  </span></label>
              <button>Sign up</button>
              {err && <span  style={{ color: 'red', fontSize:"1.1rem",opacity:"80%" }}>Something went Wrong ,try Again</span>}
              <p>Do you have a account Already?Login</p>
            </form>
         </div>
       </div>
    );
};

export default Register;
//  console.log(e.target[0].value)
// after auth we have to save the info to database , jate amra amdar frd der khuze pai , auth sheyta kore nah -- firebase database use kora
//












