import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({}); // Initialize currentUser as null initially

    useEffect(() => {
        //check if we have user, if we do..setCurrentUser
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user);
        });

        // Cleanup function to unsubscribe from the listener when component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};

//all child componet that we route w AuthContextProvider  will have access to currentUser--main.jsx 

    //AuthContextProvider-- is to wrapp all child componet
    //AuthContext-- is to wrap dynamic children componets and later to acccss data on child componet via-- useContext(AuthContext);
