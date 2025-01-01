import React from 'react'

const Input = ({ label, state, setState, placeholder, type }) => {
  return (
    <div className='mb-6'>
      <p className='capitalize mb-[0.2rem] text-lg'>{label}</p>
      <input 
        value={state}
        placeholder={placeholder}
        type={type}
        onChange={(e) => setState(e.target.value)}
        className='border w-[100%] p-[0.5rem] opacity-80 focus:opacity-100 focus:outline-blue-500 placeholder:text-gray-600'
      />
    </div>
  )
}

export default Input
