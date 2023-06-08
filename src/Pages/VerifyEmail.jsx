import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import {AiOutlineArrowLeft} from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";
import {BsArrowCounterclockwise} from "react-icons/bs";
import {signup,sendOtp} from '../Services/Operations/AuthAPI'

const VerifyEmail=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {signupData,loading}=useSelector((state)=>state.auth);
    const [otp,setOtp]=useState("");

    useEffect(()=>{
        if(!signupData){
            navigate("/signup")
        }
    },[])

    const handelOnSubmit=(e)=>{
        e.preventDefault();
        const {accountType,firstName,lastName,email,password,confirmPassword}=signupData
        dispatch(signup(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate))
    }

    const handleOnClick=(e)=>{
        e.preventDefault()
        dispatch(sendOtp(signupData.email))

    }


    return(
        <div className="w-[31.75rem] max-h-fit flex justify-center items-center mx-auto p-4 m-4 ">
            {
                loading ? 
                (<div></div>) 
                : 
                (
                <div className="w-[27.75rem] max-h-fit flex flex-col justify-between mx-auto">
                    <h1 className="text-[1.875rem] font-inter text-richblack-5 leading-[2.375rem] mb-4">Verify email</h1>
                    <p className="text-richblack-100 font-inter text-[1.125rem] leading-[1.625rem]">A verification code has been sent to you. Enter the code below</p>

                    <form className="mt-8 flex flex-col gap-y-4 " onSubmit={handelOnSubmit}>
                    <OtpInput value={otp} onChange={setOtp} numInputs={6} renderSeparator={<span>-</span>} renderInput={(props) => <input {...props} className="bg-richblack-800  w-full gap-[0.75rem] p-[0.75rem] rounded-[0.5rem] text-white text-center" style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}} />}
                    />
                     <button type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblue-900 lg:w-[27.75rem]">
                        Verify email
                    </button>
                    </form>

                    <div className="mt-4 flex flex-row justify-between items-center">
                        <Link to="/login">
                            <div className="flex flex-row text-[1rem] font-inter text-richblack-5 gap-x-2 justify-start items-center">
                                <AiOutlineArrowLeft/>
                                <p>Back to Login</p>
                            </div>
                        </Link>
                        <button type="submit" onClick={handleOnClick} className="text-richblue-100">
                            <div className="flex flex-row text-[1rem] font-inter gap-x-2 justify-start items-center">
                                    <BsArrowCounterclockwise/>
                                    <p>Resend it</p>
                            </div>
                        </button>
                    </div>
                </div>)
            }
        </div>
    )
}

export default VerifyEmail;