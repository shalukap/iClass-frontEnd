import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CgAddR } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";

export default function ClassPage() {
 const navigate=useNavigate()
 const [classes,setClasses]=useState([])
 useEffect(() => {
   const fetchClass = async () => {
     try {
      const res=await axios.get('http://localhost:5000/api/classrooms',{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).then((res)=>{
        setClasses(res.data)
        }).catch((err)=>{
          console.log(err)
        })
     } catch (error) {
       console.log(error)
     }
   }
 
   fetchClass()
 })
    return (
      <div className="w-full h-full overflow-x-auto p-4">
          <form className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-xl shadow-lg text-white">
    <h2 className="text-2xl font-semibold mb-6 text-center">Class Infomations</h2>
  
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label htmlFor="sid" className="block mb-2 text-sm font-medium">Class ID</label>
        <input
          type="text"
          id="classid"
          className="w-full px-4 py-2 text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Class ID"
        />
      </div>
  
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium">Class Name</label>
        <input
          type="text"
          id="class_name"
          className="w-full px-4 py-2 text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Class Name"
        />
      </div>
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium">Lecture Name</label>
        <input
          type="text"
          id="lec_name"
          className="w-full px-4 py-2 text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Lecture Name"
        />
      </div>
  
      
    </div>
  
    <div className="mt-8 text-center">
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
      >
        Submit
      </button>
    </div>
  </form>
    <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow">
      <thead className="bg-slate-800 text-white border-2 rounded">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-semibold">Class ID</th>
          <th className="px-4 py-3 text-left text-sm font-semibold">Class Name</th>
          <th className="px-4 py-3 text-left text-sm font-semibold">Lecturer Name</th>    
          
          <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
          <th className="px-4 py-3 text-center text-sm font-semibold">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 text-sm">
        {classes.map((c)=>(
          <tr>
          <td className="px-4 py-2">{c.classid}</td>
          <td className="px-4 py-2">{c.class_name} </td>
         
          <td className="px-4 py-2">{c.lec_name}</td>
         
          <td className="px-4 py-2 ">Active</td>
          <td className="px-4 py-2 flex justify-center items-center"><FaEdit className='hover:text-red-700 text-2xl'/></td>
        </tr>
        ))}     
        
       
      </tbody>
    </table>
    <div className="fixed bottom-4 right-4">
      <button className=" hover:text-red-700 text-5xl text-white font-bold py-2 px-4 rounded-full" onClick={()=>navigate("/admin/clsdetails")}><CgAddR /></button>
    </div>
  </div>
  
    )
}
