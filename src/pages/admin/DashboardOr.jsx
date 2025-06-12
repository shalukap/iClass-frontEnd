import React, { createContext, useContext, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { CgUser } from "react-icons/cg";
import StudentPage from './StudentPage';
import LecturePage from './LecturePage';
import ClassPage from './ClassPage';
import StudentPayment from './StudentPayment';
import LecPayment from './LecPayment';
import UserPage from './UserPage';
import StudentDetails from './StudentDetails';
import SchoolPage from './SchoolPage';

export default function Dashboard() {
    const user = {name:"John Doe",email:"x0Z3H@example.com",role:"Admin"}
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

        {name:"School",path:"/admin/school",icon:"",role:"Admin"}

        {name:"User",path:"/admin/user",icon:"",role:"User"},

    ];

    const toggleDarkTheme = () => {
        setIsDarkTheme(!isDarkTheme)
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)    
    }

    const logoutUser=async()=>{
        console.log("logout");
        
    }
  return (
    <DashboardContext.Provider value={{user,showSidebar,isDarkTheme,toggleDarkTheme,toggleSidebar,logoutUser}}>
        <div className='w-full h-screen flex'>
           
                <div className='w-[300px] h-screen bg-slate-700 fixed flex flex-col'>
                    <div className='w-full h-[20%] flex flex-col items-center justify-center text-white'>
                        <h1 className='text-4xl'>Unizone</h1>
                        <h4>Class Managment system</h4>

                    </div>
                    <div className='flex flex-col items-center justify-center'>
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
                    <Routes path="/*">
                        <Route path='/students' element={<StudentPage/>}/>
                        <Route path='/studentDetails' element={<StudentDetails/>}/>
                        <Route path='/lectures' element={<LecturePage/>}/>
                        <Route path='/classes' element={<ClassPage/>}/>
                        <Route path='/stpayments' element={<StudentPayment/>}/>
                        <Route path='/lecpayments' element={<LecPayment/>}/>
                        <Route path='/user' element={<UserPage/>}/>
                        <Route path='/school' element={<SchoolPage/>}/>
                        <Route path='/schoolDetails' element={<SchoolDetails/>}/>                       
                    </Routes>
                </div>

            </div>
           
        </div>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)

