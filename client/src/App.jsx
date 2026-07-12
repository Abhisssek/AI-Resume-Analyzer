// import React from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router'
import { Home } from './components/Home/Home'
import { use } from 'react'
import { About } from './components/About/About'



export const App = () => {

  const routes = createBrowserRouter([
  {path: '/', element:<Home/>},
  {path: '/about', element: <About/>}
])


  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  )
}
