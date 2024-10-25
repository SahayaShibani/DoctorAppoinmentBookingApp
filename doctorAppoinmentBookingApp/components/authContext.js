import React, { createContext, useState } from 'react';

// Create the context
export const AuthContext = createContext();

// AuthContext provider component
export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const[role , setRole] = useState("patient");
  const [userName , setUserName] = useState("")
  const [userId , setUserId] = useState();

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated ,role,setRole ,userName , setUserName ,setUserId,userId}}>
      {children}
    </AuthContext.Provider>
  );

};
