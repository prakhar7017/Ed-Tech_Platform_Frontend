import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux"
import {login} from "../../../Services/Operations/AuthAPI"
const LoginForm=()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData,setFormData]=useState({email:"",password:""})

    const[showPassword,setShowPassword]=useState(false);

    const { email,password }=formData;

    const handleOnChange=(e)=>{
        setFormData((prevData)=>({
            ...prevData,[e.target.name]:e.target.value
        }))
    }

    const handelOnSubmit=(e)=>{
        e.preventDefault()
        dispatch(login(email,password,navigate))

    }

    return (
        <form onSubmit={handelOnSubmit} className="flex flex-col mt-6 w-full gap-y-4">
        <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup className="text-pink-200">*</sup></p>
            <input required type="email" name="email" value={email} onChange={handleOnChange}
            placeholder="Enter Email Address"
            style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
            className=" w-full lg:w-[27.75rem] rounded-[0.5rem]
            bg-richblack-800 p-[12px] text-richblack-5"
            />
        </label>
        <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Passoword <sup className="text-pink-200">*</sup></p>
            <input required type={showPassword ? "text" : "password"} name="password" value={password} onChange={handleOnChange}
            placeholder="Enter Password"
            style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full lg:w-[27.75rem] rounded-[0.5rem]
            bg-richblack-800 p-[12px] text-richblack-5"
            />
            <span onClick={()=>setShowPassword((prev)=>!prev)} className="absolute right-3 top-[38px] z-[10] mr-auto cursor-pointer lg:right-60">
                {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)}
            </span>
            <Link to="/forgot-password">
                <p className="mt-1 ml-auto max-w-full text-xs text-blue-100">Forgot Password</p>
            </Link>
        </label>
        <button type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblue-900 lg:w-[27.75rem]">Sign In</button>
        </form>
    )
}

export default LoginForm;