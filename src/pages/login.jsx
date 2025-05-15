import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import './login.css'

export default function Login() {
    const navigate=useNavigate()
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [isLoading,setIsLoading]=useState(false)
    function handleLogin(e){
        e.preventDefault()
        setIsLoading(true)       
            axios.post('http://localhost:5000/api/users/login',{
                name:name,
                password:password
            },{withCredentials:true}).then((res)=>{     
                
                const user=res.data.user           
                localStorage.setItem('token',res.data.token)     
                if ((user.role === 'Admin' || user.role === 'User')&& user.status==="Active") {
                    navigate('/admin/')
                    toast.success('Login Success')
                    setIsLoading(false)
                }else{                    
                    toast.error('You are not authorized to login')
                    setIsLoading(false)                    
                   }
                
            }).catch((err)=>{
                
                toast.error("Username or password is incorrect")
                setIsLoading(false)
             
            })
            
        
    }
  return (
    <div className='w-full h-screen flex justify-center items-center bg-image '>
    <div className='w-[700px] h-[400px] backdrop-blur-xl bg-opacity-15 rounded-2xl flex justify-center items-center p-10 flex-col shadow-2xl shadow-white'> 

       <div className='flex'>
            <img src="../assets/logo.png" alt="logo" className='w-[250px] h-[250px] bg-cover ' />
            <form onSubmit={handleLogin}>
            <div className='flex flex-col gap-10 text-white text-2xl'>
            <input type="text" placeholder='Username' className='w-[300px] h-[50px] bg-transparent border-b-2' onChange={(e)=>setName(e.target.value)}/>
            <input type="password" placeholder='Password' className='w-[300px] h-[50px] bg-transparent border-b-2'  onChange={(e)=>setPassword(e.target.value)}/>
            <button className={`relative bg-blue-950 hover:bg-white text-white hover:text-blue-950 p-[15px] rounded-2xl text-2xl  ${isLoading ? 'pointer-events-none' : ''}`} onClick={handleLogin}>{isLoading ? (<div class='loader'></div>) : 'Login'}</button>
            
            </div>
            </form>
        </div>
    </div>
</div>
  )
}
