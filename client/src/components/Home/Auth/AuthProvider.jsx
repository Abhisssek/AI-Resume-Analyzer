// import React, { createContext, useContext } from 'react'
import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import axios from "axios";
import { api } from "../../../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // console.log(children);
  

  const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          api.defaults.baseURL + "users/check-auth",
          { withCredentials: true },
        );
        if (data.success) {
          setUser(data.user);
          setUserLoading(false);
        //   console.log(data);
        }
      } catch (error) {
        setUser(null);
        console.log(error.response);
      }

      setUserLoading(false);
    };


  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser,fetchUser, userLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
