// import { Sidebar } from 'lucide-react'
import React from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import { useAuth } from '../Home/Auth/AuthProvider'
import { Navigate } from 'react-router'

export const Dashboard = () => {

    const {user, userLoading} = useAuth();

    if(userLoading) return <div>Loading...</div>
    if(!userLoading && !user) return <Navigate to="/" replace />

  return (
    <div className='md:flex'>
        <Sidebar />
        <div>
          dashboard
        </div>
    </div>
  )
}
