import React from 'react'
import { AuthLeft } from '../AuthLeft'
import person1 from '../../../../assets/img/protagonist1-removebg-preview.png'
import { Authform } from '../Authform'
import axios from 'axios'
import {api} from '../../../../services/api.js'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { useAuth } from '../AuthProvider.jsx'
import { Navigate } from 'react-router'
import { Navbar } from '../../Navbar/Navbar.jsx'
import { useState } from 'react'

export const Login = () => {

  const navigate = useNavigate()
  
  const {user, userLoading, fetchUser,setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  
  
  
  
  const loginUser = async (data) => {

    try {
      setLoading(true);
      const res = await axios.post(api.defaults.baseURL + "users/login", data, {
        withCredentials: true
      });
       if(res.data.success){
         toast.success(res.data.message);
         setLoading(false);
         
         setTimeout(() => {
           setUser(res.data.user);
           navigate("/dashboard");
          }, 2000);
       }
       
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
        console.log(error.response.data);
        
        
      }
    }
    
    if(userLoading) return <div>Loading...</div>
    if(user) return <Navigate to="/dashboard" replace />

  return (
    <>
    {/* <Navbar /> */}
    <div className='flex flex-col w-full xl:flex-row'>
      <AuthLeft title={"Welcome Back!"} description={"AI Powered ATS analysis to help you match your resume with job description ad land your dream job"} image={person1} />
      <Authform type={"login"} loading={loading} onSubmit={loginUser} />
    </div>
    </>
  )
}
