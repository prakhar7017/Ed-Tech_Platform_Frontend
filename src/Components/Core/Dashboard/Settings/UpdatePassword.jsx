import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import IconButton from "../../../Common/IconButton";
import {UpdatePassword} from "../../../../Services/Operations/SettingAPI"



export default function ChangePassword(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register,handleSubmit,formState:{errors}}=useForm();
    const {token}=useSelector((state)=>state.auth);
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);

    const handelOnSubmit=async (data)=>{
        try {
            console.log(data)
            dispatch(UpdatePassword(token,data))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handelOnSubmit)}>
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <label className=" relative flex flex-col gap-2 lg:w-[48%]">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Current Password</p>
                            <input
                                type={`${showPassword ? "text":"password"}`}
                                name="oldPassword"
                                placeholder="Enter Current Password"
                                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                className="rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                                {...register("oldPassword",{required:true})}
                            />
                            <span onClick={()=>setShowPassword((prev)=>!prev)} className="absolute right-3 top-[45px] z-[10] cursor-pointer" >{showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> :<AiOutlineEye fontSize={24} fill="#AFB2BF"/>}</span>
                            {
                                errors.oldPassword && <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your Old Password.
                                </span>
                            }
                        </label>
                        <label className=" relative flex flex-col gap-2 lg:w-[48%]">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password</p>
                            <input
                                type={`${showConfirmPassword ? "text":"password"}`}
                                name="newPassword"
                                placeholder="Enter Current Password"
                                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                className=" rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                                {...register("newPassword",{required:true})}
                            />
                            <span onClick={()=>setShowConfirmPassword((prev)=>!prev)} className="absolute right-3 top-[45px] z-[10] cursor-pointer" >{showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> :<AiOutlineEye fontSize={24} fill="#AFB2BF"/>}</span>
                            {
                                errors.newPassword && <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your new Password.
                                </span>
                            }
                        </label>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                        navigate("/dashboard/my-profile")
                    }}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                     Cancel
                    </button>
                    <IconButton type="submit" text="Update" />
                </div>
            </form>
        </>
    )
}