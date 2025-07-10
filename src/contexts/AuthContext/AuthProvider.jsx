import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // create user
    const createUser = (email, password) => { 
        setLoading(true);   
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // sign in
    const signIn = (email, password) => {       
        return signInWithEmailAndPassword(auth, email, password);
    }
    // sign in with google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // logout
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }
    // observer for state changed
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('user in the auth state changed',currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    },[])



    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        logout,
        
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;