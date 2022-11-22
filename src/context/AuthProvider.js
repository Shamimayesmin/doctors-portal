import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from '../firebase/firebase.config';

export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)

    //1. create user
    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // 2. sign in with email and pass
    const singIn =(email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    // update user profile
    const updateUser = (userInfo) =>{
        return updateProfile(auth.currentUser, userInfo)
    }


    // log out 
    const logOut = () =>{
        setLoading(true)
        return signOut(auth)

    }

    //7. Forget Password
  const resetPassword = email => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

    const googleProvider = new GoogleAuthProvider()

    const googleSignIn = () =>{
        setLoading(true)
      return signInWithPopup(auth, googleProvider)
    }


    useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,currentUser =>{
            console.log('user observing');
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
       
    },[])

    const authInfo = {
        createUser,
        singIn,
        user,
        logOut,
        updateUser,
        loading,
        googleSignIn,
        resetPassword
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;