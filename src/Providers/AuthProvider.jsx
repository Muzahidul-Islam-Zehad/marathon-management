import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged,  signInWithEmailAndPassword,  signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";

export const contextProvider = createContext()

const AuthProvider = ({children}) => {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        onAuthStateChanged(auth, currentUser =>{
            if(currentUser)
            {
                setUser(currentUser);
                setLoading(false);
            }
            else
            {
                setUser([]);
                setLoading(false);
            }

        })
    },[])
    console.log(user, loading);

    const googleLogin = () => {
        setLoading(true);
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }
    const registerWithEmailPass = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateProfileUser = (updatedData) =>{
        setLoading(true);
        return updateProfile(auth.currentUser, updatedData);
    }

    const loginWithEmailAndPass = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth);
    }

    const contextValue = {
        user,
        setUser,
        loading,
        setLoading,
        googleLogin,
        logOut,
        registerWithEmailPass,
        updateProfileUser,
        loginWithEmailAndPass,
    }

    return (
        <contextProvider.Provider value={contextValue}>
            {children}
        </contextProvider.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.element
}

export default AuthProvider;