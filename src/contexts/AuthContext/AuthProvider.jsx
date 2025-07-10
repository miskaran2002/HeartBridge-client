import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

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

    // logout
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }
    // observer for state changed
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
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
        logout,
        
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;