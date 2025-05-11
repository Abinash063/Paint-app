// src/Signup.js
import React, { useState,useEffect } from 'react';
import { createUserWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import './style.css';

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      console.log(user)
      setUser(user)
    })
    if(user){
      localStorage.setItem('user',JSON.stringify(user))
    }
    return () => subscribe()
  })

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(authUser.user,{
        displayName : name
      })
      alert('Signup successful');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      <input
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}
