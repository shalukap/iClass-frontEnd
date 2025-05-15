import React from 'react'
import { CgAddR } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

export default function LecturePage() {
 const navigate=useNavigate()
   return (
     <div className="w-full h-full overflow-x-auto p-4">
         <form className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-xl shadow-lg text-white">
   <h2 className="text-2xl font-semibold mb-6 text-center">Lecture Infomation</h2>
 
   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
     <div>
       <label htmlFor="sid" className="block mb-2 text-sm font-medium">Lecture ID</label>
       <input
         type="text"
         id="lid"
         className="w-full px-4 py-2 text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
         placeholder="Enter SID"
       />
     </div>
 
     <div>
       <label htmlFor="name" className="block mb-2 text-sm font-medium">Lecture Name</label>
       <input
         type="text"
         id="lec_name"
         className="w-full px-4 py-2 text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
         placeholder="Enter Name"
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
     <thead className="bg-slate-800 text-white">
       <tr>
         <th className="px-4 py-3 text-left text-sm font-semibold">LID</th>
         <th className="px-4 py-3 text-left text-sm font-semibold">Lecture Name</th>
         
         <th className="px-4 py-3 text-left text-sm font-semibold">Address</th>
         <th className="px-4 py-3 text-left text-sm font-semibold">Qualification</th>
         <th className="px-4 py-3 text-left text-sm font-semibold">Telephone number</th>
        
         <th className="px-4 py-3 text-left text-sm font-semibold">WhatsApp</th>
         <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
         <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
       </tr>
     </thead>
     <tbody className="divide-y divide-gray-200 text-sm">
       {/* Example row – map through your data here */}
       <tr>
         <td className="px-4 py-2">LEC001</td>
         <td className="px-4 py-2">John Doe</td>
        
         <td className="px-4 py-2">123 Main St</td>
         <td className="px-4 py-2">MSc</td>
        
         <td className="px-4 py-2">+94712345678</td>
         <td className="px-4 py-2">+94771234567</td>
         <td className="px-4 py-2">Active</td>
       </tr>
       
       {/* Repeat rows dynamically */}
     </tbody>
   </table>
   <div className="fixed bottom-4 right-4">
     <button className=" hover:text-red-700 text-5xl text-white font-bold py-2 px-4 rounded-full" onClick={()=>navigate("/admin/lecdetails")}><CgAddR /></button>
   </div>
 </div>
 
   )
}
