import React, { useEffect, useState } from "react";
import {useForm} from "react-hook-form"
import CountryCode from "../../data/countrycode.json"




const ContactusForm=()=>{
    const [loading,setLoading]=useState(false);
    const {register,reset,handleSubmit,formState:{errors,isSubmitSuccessful}}=useForm();

    const handelOnSubmit=()=>{

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
            <div>
                <div>
                    <label>
                        <p>First Name<sup>*</sup></p>
                        <input type="text" name="text" placeholder="Enter First Name" {...register("firstname",{required:true})}/>
                        {errors.firstname && ( <span>Please Enter Your Name</span>)}
                    </label>
                    <label>
                        <p>Last Name</p>
                        <input type="text" name="text" placeholder="Enter Last Name" {...register("lastName")}/>
                    </label>
                </div>

                <label>
                    <p>Phone Number<sup>*</sup></p>
                    <div>
                        <select name="dropDown">
                            {CountryCode.map((element,index)=>(
                                <option key={index} value={element.code} defaultValue={element.code==="+91"}>{element.code}-{element.country}</option>
                            ))}
                        </select>
                        <input type="number" name="phoneNo" placeholder="1234567890" {...register("phoneNo",{required:{value:true,message:"Please Enter Your Phone Number"},maxLength:{value:10,message:"Invalid Number"},minLength:{value:8,message:"Invalid Number"}})}/>
                    </div>
                    {
                        errors.phoneNo && (<span>{errors.phoneNo.message}</span>)
                    }
                </label>

                <label>
                    <p>Email Address<sup>*</sup></p>
                    <input type="email" name="email" placeholder="Enter Email Address" {...register("email",{required:true})}/>
                    {
                        errors.email && (<span>Please Enter Your Email</span>)
                    }
                </label>

                <label>
                    <p>Message<sup>*</sup></p>
                    <textarea name="message" cols={30} rows={10} placeholder="Enter Your message here" {...register("message",{required:true})}/>
                    {
                        errors.message && (<span> Please Enter Your Message</span>)
                    }
                </label>

                <button type="submit">Send Message</button>

            </div>
        </form>
    )
}

export default ContactusForm;