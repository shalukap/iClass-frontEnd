import React from 'react'
import FormRow from '../../components/FormRow'

export default function LectureDetails() {
  
  
    return (
      <div>
          <form className="max-w-5xl mx-auto bg-slate-800 p-10 rounded-xl shadow-xl shadow-slate-400 text-white">
    <h2 className="text-3xl font-bold mb-8 text-center">Add New Lecture</h2>
  
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
      <FormRow lblName="Lecture ID" type="text" name="s_id" placeholder="Enter Lecture ID" readOnly={true} />
      <FormRow lblName="Lecture Name" type="text" name="s_name" placeholder="Enter Lecture Name"  required={true}/>        
      <FormRow lblName="Address" type="text" name="s_address" placeholder="Enter Student Address" required={true} />
      <FormRow lblName="Date of birth" type="date" name="lec_dob"  required={true} />
      <FormRow lblName="Qualifications" type="text" name="lec_qualification" placeholder="Enter Qualifications" required={true} />           
      <FormRow lblName="Telephone number" type="text" name="tp_no" placeholder="0112345678" required={true} />
      <FormRow lblName="Watsapp number" type="text" name="watsapp_no" placeholder="Watsapp number" required={true} />
      <FormRow lblName="Account number" type="text" name="lec_email" placeholder="Enter Bank Account" required={true} />
      
  
     
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
