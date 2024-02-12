import React from 'react';
import { MdOutlineAttachFile } from "react-icons/md";
import { FaRegImage } from "react-icons/fa6";

const Input = () => {
    return (
        <div className='input'>
            <input type="text" placeholder='Type something here....' />
            <div className="send">
            <MdOutlineAttachFile className='inputIconz' />
                <input type="file"  id="file" style={{display:"none"}} />
                <label htmlFor="file">
                <FaRegImage className='inputIconz'/>
                </label>
                <button>Send</button>
            </div>
        </div>
    );
};

export default Input;