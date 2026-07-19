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

export const Login = () => {

  const navigate = useNavigate()
  
  const {user, userLoading, fetchUser,setUser } = useAuth();

  if(userLoading) return <div>Loading...</div>
  if(user) return <Navigate to="/dashboard" replace />


  
 
  const loginUser = async (data) => {

    try {
      const res = await axios.post(api.defaults.baseURL + "users/login", data, {
        withCredentials: true
      });
       if(res.data.success){
         toast.success(res.data.message);
         
         setTimeout(() => {
           setUser(res.data.user);
           navigate("/dashboard");
         }, 2000);
       }
      
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data);
      
      
    }
  }


  return (
    <div className='flex flex-col w-full xl:flex-row'>
      <AuthLeft title={"Welcome Back!"} description={"AI Powered ATS analysis to help you match your resume with job description ad land your dream job"} image={person1} />
      <Authform type={"login"} onSubmit={loginUser} />
    </div>
  )
}
