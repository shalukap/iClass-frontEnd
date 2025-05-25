import React from 'react'
import FormRow from '../../components/FormRow'
import axios from 'axios'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'



export default function StudentDetails() {
  const navigate=useNavigate()
  const [sid, setSid] = useState('');
  const [sname, setSname] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState(0);
  const [dob, setDob] = useState('');
  const [school, setSchool] = useState('');
  const[parentName, setParentName]= useState('');
  const[tpNo,setTpno]= useState('');
  const[watsappNo,setWatsappNo]= useState('');
  const [active, setActive] = useState(true);
 
 

  async function handleSubmit(e){
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }
    e.preventDefault();
   const studentData={       
    s_id:sid,
    s_name:sname,
    s_gender:gender,
    s_address:address,
    s_age:age,
    s_dob:dob,
    s_school:school,
    parent_name:parentName,
    tp_no:tpNo,
    watsapp_no:watsappNo,
   }
   const res=axios.post('http://localhost:5000/api/students',studentData,
    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).then((res)=>{
      toast.success('New Student added successfully')
      setTimeout(() => navigate('/admin/students'), 1000);
      }).catch((err)=>{
       toast.error(err.response.data.msg) })       
        
      }
    const schools=[{name:"Ave Maria Convent-Negombo"},{name:"Maris Stella College-Negombo"},{name:"Ave Maria Convent-Bolawalana"}]

  return (
    <div>
        <form className="max-w-5xl mx-auto bg-slate-800 p-10 rounded-xl shadow-xl shadow-slate-400 text-white" onSubmit={handleSubmit}>
  <h2 className="text-3xl font-bold mb-8 text-center">Add New Student</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
    <FormRow lblName="Student ID" type="text" name="s_id" placeholder="Enter Student ID" readOnly={true} />
    <FormRow lblName="Student Name" type="text" name="s_name" placeholder="Enter Student Name"  required={true} onChange={(e)=>{setSname(e.target.value)}}/>
    <div>
    <label className="block mb-2 text-sm font-medium text-white">Gender</label>
    <select
      name="s_gender"
      className="w-full px-4 py-2 text-white bg-slate-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e)=>{setGender(e.target.value)}}
    >
      <option value="">-- Select --</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>   


    </div>
    
    <FormRow lblName="Address" type="text" name="s_address" placeholder="Enter Student Address" required={true} onChange={(e)=>{setAddress(e.target.value)}}/>
    <FormRow lblName="Age" type="number" name="s_age" placeholder="00" required={true} onChange={(e)=>{setAge(e.target.value)}}/>
    <FormRow lblName="Date of Birth" type="date" name="s_dob" required={true} onChange={(e)=>{setDob(e.target.value)}}/>
    <div>
  <label className="block mb-2 text-sm font-medium text-white">Present School</label>
  <select
    name="s_school"
    className="w-full px-4 py-2 text-white bg-slate-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={(e)=>{setSchool(e.target.value)}}
  > 
    <option value="">-- Select --</option>
    {schools.map((school, index) => (
      <option key={index} value={school.name}>
        {school.name}
      </option>
    ))}
  </select>
</div>
    <FormRow lblName="Parent Name" type="text" name="parent_name" placeholder="Enter Parent Name" required={true} onChange={(e)=>{setParentName(e.target.value)}}/>
    <FormRow lblName="Telephone number" type="text" name="tp_no" placeholder="0112345678" required={true} onChange={(e)=>{setTpno(e.target.value)}}/>
    <FormRow lblName="Watsapp number" type="text" name="watsapp_no" placeholder="Watsapp number" required={true} onChange={(e)=>{setWatsappNo(e.target.value)}}/>
    

   
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
