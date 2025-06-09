import React, { createContext, useContext, useState } from 'react'
import { Link, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { CgUser } from "react-icons/cg";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import SchoolPage from './SchoolPage';
import SchoolDetails from './SchoolDetails';

export default function Dashboard() {
    let user=null
    const token = localStorage.getItem('token')
    if (token){
        const decodedToken = jwtDecode(token)
        if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem('token')
        }else{
            user=decodedToken
        }
    }
    const navigate=useNavigate()

    function logoutUser(){
        axios.post('http://localhost:5000/api/users/logout',{},{withCredentials:true})
        .then((res)=>{localStorage.removeItem('token')
            navigate('/')
        })
        .catch((err)=>{
            console.log(err)})
    }
   
    const DashboardContext = createContext()
    const [showSidebar, setShowSidebar] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(false)

    const location =useLocation()
    const menuItems = [
        {name:"Dashboard",path:"/admin/",icon:"",role:"User"},
        {name:"Students",path:"/admin/students",icon:<CgUser />,role:"User"},
        {name:"Lectures",path:"/admin/lectures",icon:"",role:"Admin"},
        {name:"Classes",path:"/admin/classes",icon:"",role:"Admin"},       
        {name:"Student Payments",path:"/admin/stpayments",icon:"",role:"User"},
        {name:"Lecture Payments",path:"/admin/lecpayments",icon:"",role:"Admin"},
        {name:"User",path:"/admin/user",icon:"",role:"User"},
        {name:"School",path:"/admin/school",icon:"",role:"Admin"},
    ];

    const toggleDarkTheme = () => {
        setIsDarkTheme(!isDarkTheme)
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)    
    }

    
  return (
    <DashboardContext.Provider value={{user,showSidebar,isDarkTheme,toggleDarkTheme,toggleSidebar,logoutUser}}>
        <div className='w-full h-screen flex'>
           
                <div className='w-[300px] h-screen bg-slate-700 fixed flex flex-col'>
                    <div className='w-full h-[20%] flex flex-col items-center justify-center text-white'>
                        <h1 className='text-4xl'>Unizone</h1>
                        <h4>Class Managment system</h4>

                    </div>
                    <div className='w-[300px] h-screen bg-slate-700 fixed flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700'>
                        {menuItems.filter(item=>{
                            if(user.role==="Admin") return true;
                            if(user.role==="User") return item.role!=="Admin";
                        }).map((item,index)=>(
                            <Link key={index} to={item.path} className={`text-center ml-4 mr-5 hover:bg-white hover:text-slate-800 rounded-xl w-full transition-all p-5 ${location.pathname===item.path?'bg-white text-slate-800 rounded-l-xl transition p-5':' text-white'}`}>
                                
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className='absolute bottom-0 w-full h-[10%] flex flex-col items-center justify-center bg-[#583141] text-white'>
                        {user.role}: {user.name}
                        <button onClick={logoutUser} className='bg-red-600 px-4 py-2 rounded'>Logout</button>
                    </div>
                </div>
                        
            <div className='flex-1 ml-[300px] h-screen bg-slate-800 overflow-auto'>
                <div className='w-full h-[10%] bg-slate-700 justify-center items-center flex'>
                        <h1 className='text-4xl text-white text-center '>Today : {new Date().toDateString()}</h1>
                </div>
                <div>
                    <Outlet/>
                    
                </div>

            </div>
           
        </div>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)

