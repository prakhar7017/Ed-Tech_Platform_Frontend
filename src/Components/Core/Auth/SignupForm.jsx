import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { ACCOUNT_TYPE } from "../../../Util/Contants";
import Tab from "../../Common/Tab";
const SignupForm=()=>{
    const [accountType,setAccountType]=useState(ACCOUNT_TYPE.STUDENT);

    const [formData,setFormData]=useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);

    const {firstName,lastName,email,password,confirmPassword}=formData

    const handelOnChange=(e)=>{
        setFormData((prevData)=>({
            ...prevData,[e.target.name]:e.target.value
        }))
    }

    const tabData=[{
        id: 1,
        tabName: "Student",
        type: ACCOUNT_TYPE.STUDENT,
      },
      {
        id: 2,
        tabName: "Instructor",
        type: ACCOUNT_TYPE.INSTRUCTOR,
      }]
    return (
        <div>
        <Tab tabData={tabData} field={accountType} setfield={setAccountType}/>

        <form className="flex flex-col w-full gap-y-4">
            <div className="flex gap-x-4">
                <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    First Name <sup className="text-pink-200">*</sup>
                    </p>
                    <input required
                        type="text" name="firstName" value={firstName} onChange={handelOnChange}
                        placeholder="Enter First Name"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[13.25rem] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"

                    />
                </label>
                <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Last Name <sup className="text-pink-200">*</sup>
                    </p>
                    <input required
                        type="text" name="lastName" value={lastName} onChange={handelOnChange}
                        placeholder="Enter Last Name"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[13.25rem] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"

                    />
                </label>
            </div>

            <label>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input required type="email" name="email" value={email}
                onChange={handelOnChange} placeholder="Enter Email Address"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                }}
                className="lg:w-[27.75rem] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
            </label>

            <div className="flex gap-x-4">
                <label className="relative">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Create Password <sup className="text-pink-200">*</sup>
                    </p>
                    <input required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handelOnChange}
                        placeholder="Enter Password"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                        }}
                        className="w-[13.25rem] rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                        />
                        <span onClick={()=>setShowPassword((prev)=>!prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {
                                showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : (<AiOutlineEye
                                    fontSize={24} fill="#AFB2BF"
                                />) 
                            }
                        </span>
                </label>
                <label className="relative">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Confirm Password <sup className="text-pink-200">*</sup>
                    </p>
                    <input required
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handelOnChange}
                        placeholder="Confirm Password"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                        }}
                        className="w-[13.25rem] rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                        />
                        <span onClick={()=>setShowConfirmPassword((prev)=>!prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {
                                showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : (<AiOutlineEye
                                    fontSize={24} fill="#AFB2BF"
                                />) 
                            }
                        </span>
                </label>

            </div>
            <button type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 lg:w-[27.75rem]">
                Create Account
            </button>
        </form>
        </div>
    )
}

export default SignupForm;