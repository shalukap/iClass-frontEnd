import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import StudentPage from './pages/admin/StudentPage'
import LecturePage from './pages/admin/LecturePage'
import StudentDetails from './pages/admin/StudentDetails'
import ClassPage from './pages/admin/ClassPage'
import StudentPayment from './pages/admin/StudentPayment'
import LecPayment from './pages/admin/LecPayment'
import UserPage from './pages/admin/UserPage'
import LectureDetails from './pages/admin/LectureDetails'
import ClassDetails from './pages/admin/ClassDetails'
import Login from './pages/login'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorPage from './pages/ErrorPage'
import SchoolPage from './pages/admin/SchoolPage'
import SchoolDetails from './pages/admin/SchoolDetails'

function App() {
  const [count, setCount] = useState(0)
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Login/>
    },

    {
      path:'admin',
      element:<ProtectedRoute><Dashboard/></ProtectedRoute>,
      children:[
       
        {
          path:'students/',
          element:<StudentPage/>,         
        },
        {
          path:'studentdetails',
          element:<StudentDetails/>
        },
        {
          path:'lectures',
          element:<LecturePage/>
        },
        {
          path:'lecdetails',
          element:<LectureDetails/>
        },
        {
          path:'classes',
          element:<ClassPage/>
        },
        {
          path:'clsdetails',
          element:<ClassDetails/>
        },
        {
          path:'stpayments',
          element:<StudentPayment/>
        },
        {
          path:'lecpayments',
          element:<LecPayment/>
        },
        {
          path:'user',
          element:<UserPage/>
        },
        {

          path: 'school',
          children: [
            {
              path: '',
              element: <SchoolPage />
            },
            {
              path: 'add',
              element: <SchoolDetails />   // for creating
            },
            {
              path: ':schoolId',
              element: <SchoolDetails />   // for editing
            }
          ]
        }


      ]
    },
    {
      path:'*',
      element:<ErrorPage/>
    }
  ])

  return (

     <React.StrictMode>
       <Toaster/>
      <RouterProvider router={router}/>
     
    </React.StrictMode>
  )
}

export default App
