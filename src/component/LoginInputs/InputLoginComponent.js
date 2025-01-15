import React from 'react'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'

const InputLoginComponent = ({ placeholder, icon, name, errors, touched, changeHandler, value }) => {
    return (
        <>
            <div className='bg-gray-100 p-[10px] w-1/2 flex items-center gap-[10px] font-bodyFont relative'>
                <div className='text-gray-700'>{icon}</div>
                <input type='text' placeholder={placeholder} name={name} value={value} onChange={changeHandler}
                    className='bg-gray-100 outline-none text-[14px] w-full ' />
                {errors && touched && <p className='absolute text-[10px] bottom-[-12px] text-red-400'> {errors}</p>}
            </div>
        </>
    )
}

export default InputLoginComponent

const InputPasswordComponent = ({ placeholder, icon, name, errors, touched, changeHandler, value, showPassword, setShowPassword }) => {
    return (
        <>
            <div className='bg-gray-100 p-[10px] w-1/2 flex items-center gap-[10px] font-bodyFont relative'>
                <div className='text-gray-700'>{icon}</div>
                <input type={showPassword ? 'text' : 'password'} placeholder={placeholder} name={name} value={value} onChange={changeHandler} autoComplete={name}
                    className='bg-gray-100 outline-none text-[14px] w-full ' />
                <p className='text-gray-700 cursor-pointer' onClick={setShowPassword}>{showPassword ? <VscEyeClosed /> : <VscEye />}</p>
                {errors && touched && <p className='absolute text-[10px] bottom-[-12px] text-red-400'> {errors}</p>}
            </div>
        </>
    )
}

export { InputPasswordComponent }