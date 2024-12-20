import React, { useContext, useState } from 'react';
import { MdOutlineAttachFile } from "react-icons/md";
import { FaRegImage } from "react-icons/fa6";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../Firebase';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid} from 'uuid';

const Input = () => {
    const [text,setText]=useState("")
    const [img , setImg]=useState(null)

    const {currentUser}= useContext(AuthContext)
    const {data}=useContext(ChatContext);

    const handleSend=async ()=>{
        if (img) {
            const storageRef= ref(storage,uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (err)=>{},
                ()=>{
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        await updateDoc(doc(db,"chats",data.chatId),{
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                data: Timestamp.now(),
                                img: downloadURL
                            })
                           })
                    })
                }
            )
        }
     else {
       await updateDoc(doc(db,"chats",data.chatId),{
        messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            data: Timestamp.now(),
        })
       })
        };
       // updating last msg in nested field +date for sorting chat
        await updateDoc(doc(db, "userchats",currentUser.uid),{
            [data.chatId+".lastMessage"]:{
                text,
            },[data.chatId + ".data"]: serverTimestamp(),
        })

        await updateDoc(doc(db, "userchats",data.user.uid),{
            [data.chatId+".lastMessage"]:{
                text,
            },[data.chatId + ".data"]: serverTimestamp(),
        })


        setText("");
        setImg(null);
    }
    return (
        <div className='input'>
            <input type="text" placeholder='Type something here....' 
            onChange={(e)=>setText(e.target.value)}
            value={text}/>
            <div className="send">
            <MdOutlineAttachFile className='inputIconz' />
                <input type="file"  id="file" style={{display:"none"}} onChange={(e)=>setImg(e.target.files[0])}/>
                <label htmlFor="file">
                <FaRegImage className='inputIconz'/>
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Input;