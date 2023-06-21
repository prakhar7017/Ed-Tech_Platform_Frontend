import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../../Common/IconButton";
import { useNavigate } from "react-router-dom";
import {updateProfile} from "../../../../Services/Operations/SettingAPI"

export default function EditDetails(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const {register,handleSubmit,formState:{errors},}=useForm();
    const genders = ["Male", "Female", "Other"]

    const handleOnSubmit=async(data)=>{
        try {
            console.log(user);
            console.log(data);
            dispatch(updateProfile(token,data))
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <h2 className="text-lg font-semibold text-richblack-5">Profile Information</h2>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <label className="flex flex-col gap-2 lg:w-[48%]">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name</p>
                            <input type="text"
                                name="firstName"
                                placeholder="Enter Name"
                                defaultValue={user?.firstName}
                                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className=" rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                                {...register("firstName",{required:true})}
                            />
                            {errors.firstName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                 Please enter your first name.
                                </span>
                            )}
                        </label>
                        <label className="flex flex-col gap-2 lg:w-[48%]">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name</p>
                            <input type="text"
                                name="lastName"
                                placeholder="Enter Name"
                                defaultValue={user?.lastName}
                                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className=" rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                                {...register("lastName",{required:true})}
                            />
                            {errors.lastName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                 Please enter your Last name.
                                </span>
                            )}
                        </label>
                    </div>
                    {/* 2nd  */}
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <label className="flex flex-col gap-2 lg:w-[48%]">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Date of Birth</p>
                            <input type="date"
                                name="dateOfBirth"
                                placeholder="Enter date of birth"
                                defaultValue={user?.additionalDetails?.dateofBirth}
                                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className=" rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                                {...register("dateOfBirth",{required:true,
                                    max:{
                                    value: new Date().toISOString().split("T")[0],
                                    message: "Date of Birth cannot be in the future."
                                }})}
                            />
                            {errors.dateOfBirth && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.dateOfBirth.message}
                                </span>
                            )}
                        </label>
                        <label className="flex flex-col gap-2 lg:w-[48%]">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Gender</p>
                            <select
                                type="text"
                                name="gender"
                                placeholder="Enter "
                                defaultValue={user?.additionalDetails?.gender}
                                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className=" rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                                {...register("gender",{required:true})}>
                                {
                                    genders.map((element,index)=>{
                                        return (
                                            <option key={index} value={element}>{element}</option>
                                        )
                                    })
                                }

                            </select>
                            {errors.gender && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                 Please enter your Gender.
                                </span>
                            )}
                        </label>
                    </div>
                    {/* 3  */}
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <label className="flex flex-col gap-2 lg:w-[48%]">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Contact Number</p>
                            <input type="number"
                                name="contactNumber"
                                placeholder="Enter your contact number"
                                defaultValue={user?.additionalDetails?.contactNumber}
                                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className=" rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                                {...register("contactNumber",{required:true,
                                maxLength:{value:10,message:"Invalid Number"},
                                minLength:{value:8,message:"Invalid Number"}
                                })}
                            />
                            {errors.contactNumber && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.contactNumber.message}
                                </span>
                            )}
                        </label>
                        <label className="flex flex-col gap-2 lg:w-[48%]">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">About</p>
                            <input
                                type="text"
                                name="about"
                                placeholder="write Bio "
                                defaultValue={user?.additionalDetails?.about}
                                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className=" rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                                {...register("about",{required:true})}/>

                                {errors.about && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                 Please write about yourself.
                                </span>
                            )}
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
                    <IconButton type="submit" text="Save" />
                </div>
            </form>
        </>
    )
}