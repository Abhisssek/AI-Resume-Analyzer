import React from 'react'
import { Navbar } from './Navbar/Navbar'
import { Hero } from './Hero/Hero'
import { Navigate } from 'react-router'
import { useAuth } from './Auth/AuthProvider'

export const Home = () => {
  const {user, userLoading} = useAuth();
  // const navigate = useNavigate();

  // console.log(userLoading);

  if(userLoading){
    return <div>Loading...</div>;
  }


  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  


  return (
    <div className='w-full h-full'>
        <Navbar />
        <Hero />
    </div>
  )
}
