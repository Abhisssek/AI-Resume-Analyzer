import React from 'react'
import { AuthLeft } from '../AuthLeft'
import person1 from '../../../../assets/img/protagonist1-removebg-preview.png'
import { Authform } from '../Authform'
import axios from 'axios'
import {api} from '../../../../services/api.js'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { useAuth } from '../AuthProvider'
import { Navigate } from 'react-router'

export const Signup = () => {

  const navigate = useNavigate()
  
  const {user, userLoading, fetchUser} = useAuth();

  if(userLoading) return <div>Loading...</div>
  if(user) return <Navigate to="/dashboard" replace />


  const signInUser = async (data) => {

    try {
      const res = await axios.post(api.defaults.baseURL + "users/register", data, {
        withCredentials: true
      });
       if(res.data.success){
         toast.success(res.data.message);

         setTimeout(() => {
           navigate("/login");
         }, 2000);
       }
      
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data);
      
      
    }
  }


  return (
    <div className='flex flex-col w-full xl:flex-row'>
      <AuthLeft title={"Create Account"} description={"Join Job seekers who improved their career with us"} image={person1} />
      <Authform type={"signup"} onSubmit={signInUser} />
    </div>
  )
}
