import React, { useEffect, useState } from "react";
import {useForm} from "react-hook-form"
import CountryCode from "../../data/countrycode.json"
import {Contactus} from "../../Services/Operations/AuthAPI"
import { useDispatch } from "react-redux";




const ContactusForm=()=>{
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);
    const {register,reset,handleSubmit,formState:{errors,isSubmitSuccessful}}=useForm();

    const handelOnSubmit=async(data)=>{
        try {
            dispatch(Contactus(data));
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset,isSubmitSuccessful])


    return (
        <form onSubmit={handleSubmit(handelOnSubmit)}>
            <div className="flex flex-col gap-y-8">
                <div className="flex gap-x-4 mt-[3rem]">
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            First Name
                            <sup className="text-pink-200">*</sup>
                        </p>
                        <input 
                            type="text" 
                            name="firstname" 
                            placeholder="Enter First Name" 
                            {...register("firstname",{required:true})}  
                            style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                            className="w-[13.25rem] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 mt-2"
                        />
                        {errors.firstname && ( <span className="-mt-1 text-[12px] text-yellow-100">Please Enter Your Name</span>)}
                    </label>
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Last Name
                        </p>
                        <input 
                            type="text" 
                            name="lastname" 
                            placeholder="Enter Last Name" 
                            {...register("lastname")}  
                            style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                            className="w-[13.25rem] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 mt-2"
                        />
                    </label>
                </div>


                <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Email Address
                        <sup className="text-pink-200">*</sup>
                    </p>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter Email Address" 
                        {...register("email",{required:true})} 
                        style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                        className="lg:w-[27.75rem] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 mt-2"
                    />
                    {
                        errors.email && (<span className="-mt-1 text-[12px] text-yellow-100">Please Enter Your Email</span>)
                    }
                </label>

                <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Phone Number
                        <sup className="text-pink-200">*</sup>
                    </p>
                    <div className="flex gap-x-4 justify- ">
                        <select 
                            name="dropDown" 
                            style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255,255, 0.18)"}}
                            className="lg:w-[5.063rem] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" >
                                {CountryCode.map((element,index)=>(
                                    <option key={index} value={element.code}>{element.code}-{element.country}</option>
                                ))}
                        </select>
                        <input 
                            type="number" 
                            name="phonenumber" 
                            placeholder="1234567890" 
                            {...register(
                                "phoneNo",{required:{value:true,message:"Please Enter Your Phone Number"},maxLength:{value:10,message:"Invalid Number"},
                                minLength:{value:8,message:"Invalid Number"}})} 
                            style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                            className="w-[calc(100%-5.625rem)] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 mt-2"
                        />
                    </div>
                    {
                        errors.phoneNo && (<span className="-mt-1 text-[12px] text-yellow-100">{errors.phoneNo.message}</span>)
                    }
                </label>

                

                <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Message
                        <sup className="text-pink-200">*</sup>
                    </p>
                    <textarea 
                        name="message" 
                        cols={30} 
                        rows={10} 
                        placeholder="Enter Your message here" 
                        {...register("message",{required:true})} 
                        style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 mt-2"
                    />
                    {
                        errors.message && (<span className="-mt-1 text-[12px] text-yellow-100"> Please Enter Your Message</span>)
                    }
                </label>

                <button type="submit" className=" rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] transition-all duration-200 hover:scale-95 hover:shadow-none disabled:bg-richblack-500 sm:text-[16px]">Send Message</button>

            </div>
        </form>
    )
}

export default ContactusForm;