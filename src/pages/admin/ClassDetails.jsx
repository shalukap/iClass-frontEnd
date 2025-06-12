import React, { useState } from 'react'
import FormRow from '../../components/FormRow'
import axios from 'axios'

export default function ClassDetails() {    
    const [clsName,setClsName]=useState('')
    const [lecName,setLecName]=useState('')
   
    async function handleSubmit(e){
        e.preventDefault();
       const clsData={       
        class_name:clsName,
        lec_name:lecName,        
       }
       const res=axios.post(`${import.meta.env.VITE_API_URL}/api/classrooms`,clsData,
        {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).then((res)=>{
          console.log(res)})
          .catch((err)=>{
            console.log(err)})    
       
    }
  return (
        <div>
            <form className="max-w-5xl mx-auto bg-slate-800 p-10 rounded-xl shadow-xl shadow-slate-400 text-white" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold mb-8 text-center">Add New Class</h2>    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">       
        <FormRow lblName="Class Name" type="text" name="clsName" placeholder="Enter Class Name"  required={true} onChange={(e)=>{setClsName(e.target.value)}}/>
        <FormRow lblName="Lecture Name" type="text" name="lecName" placeholder="Enter Lecture Name"  required={true} onChange={(e)=>{setLecName(e.target.value)}}/>        
      </div>
    
      <div className="mt-8 text-center">
        <button
          type="submit"
         
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all"
        >
          Submit
        </button>
      </div>
    </form>
    
        </div>
      )
}
