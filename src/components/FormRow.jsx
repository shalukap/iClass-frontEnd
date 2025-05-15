import React from 'react'

export default function FormRow({lblName,type,name,placeholder,readOnly,onChange,required}) {
  return (
    <div>
    <label className="block mb-2 text-sm font-medium">{lblName}</label>
    <input
      type={type}
      name={name}      
      className="w-full px-4 py-2 text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={onChange}
      required={required}
      
    />
  </div>
  )
}
