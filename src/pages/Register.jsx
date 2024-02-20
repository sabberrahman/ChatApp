import React, { useState } from 'react';
import { LuImagePlus } from "react-icons/lu";
import {  createUserWithEmailAndPassword ,updateProfile } from "firebase/auth";
import {auth , storage} from "../Firebase"
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import { db } from '../Firebase';

const Register = () => {
  const [err,setErr]=useState(false)
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Update selected file state when file input changes
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile--firebase function
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore--serach kore paoa jaby pore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/"); //succesful oparation er por homepage a jaby
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

    return (
       <div className="formContainer">
         <div className="formWrapper">
            <span className="logo">SabbyChat Application</span>
            <span className="title">Register</span>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input type="text" placeholder='Display Username' />
              <input type="email" placeholder='Email' />
              <input type="password" placeholder='Password' />
              <input type="file" style={{ display: "none" }} id='file' onChange={handleFileChange} />
                {selectedFile ? (
                  <label htmlFor="file" style={{overflow:"hidden"}}>
                  <LuImagePlus style={{ fontSize: "1.5rem" }} />
                  <span>{selectedFile.name}</span>
                </label>
                 
                ) : (
                  <label htmlFor="file">
                    <LuImagePlus style={{ fontSize: "1.5rem" }} />
                    <span>Upload profile</span>
                  </label>
                )}
               <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
              {err && <span  style={{ color: 'red', fontSize:"1.1rem",opacity:"80%" }}>Something went Wrong ,try Again</span>}
              <p>Do you have a account Already? <Link to="/login">Login</Link> </p>
            </form>
         </div>
       </div>
    );
};

export default Register;
//  console.log(e.target[0].value);
// after auth we have to save the info to database , jate amra amdar frd der khuze pai , auth sheyta kore nah -- firebase database use kora





// try {
//   const res = await createUserWithEmailAndPassword(auth, email, password);
//   const user = res.user;
//   console.log(user);

//   const storageRef = ref(storage, user.displayName); // Use user's displayName

//   const uploadTask = uploadBytesResumable(storageRef, file);

//   uploadTask.on(
//     "state_changed", 
//     (snapshot) => {
//       // Handle progress
//     },
//     (error) => {
     
//       setErr(true); 
//     },
//     async () => {
//       const downloadURL = await getDownloadURL(uploadTask.snapshot.ref); // Await for downloadURL
//       await updateProfile(user, {
//         displayName: user.displayName, 
//         photoURL: downloadURL,
//       });
//       await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid, 
//         displayName: user.displayName, 
//         email: user.email, 
//         photoURL: downloadURL,
//       });

//       await setDoc(doc(db, "userchats",user.uid ),{})
//       navigate("/") // after succecfull function run we go to homepage
//     }
//   );
//   // Handle success
// } catch (err) {
//   setErr(true)
// }
// }












