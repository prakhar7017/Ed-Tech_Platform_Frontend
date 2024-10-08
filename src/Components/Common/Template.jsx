import React from "react";
import HighLightedText from "../Core/HomePage/HighLightedText";
import LoginForm from "../Core/Auth/LoginForm";
import SignupForm from "../Core/Auth/SignupForm";
import FrameImage from "../.././assets/Images/frame.png"

const Template=({title,description1,description2,image,formType})=>{
    return (
        <div className="flex flex-col-reverse md:flex-row w-11/12 lg:max-w-maxContent py-12 gap-y-12 mx-auto md:gap-y-0 md:gap-x-12  justify-between">
            <div className="w-11/12 w-max-[450px] mx-auto md:mx-0">

                <h1 className="text-white font-semibold text-[1.875rem] leading-[2.375rem] tracking-tight">{title}</h1>

                <p className="text-[1.125rem] leading-[1.625] mt-4 lg:w-[450px]">
                    <span className="text-[#afb2bf]">{description1}</span>
                    <span className="font-edu-sa italic"><HighLightedText text={description2}/></span> 
                </p>

                {
                    formType==="signup" ? <SignupForm/> : <LoginForm/>
                }
            </div>

            <div className="relative mx-auto w-11/12 lg:max-w-[450px] md:mx-0">
                <img src={FrameImage} alt="Pattern"  width={558} height={504} loading="lazy"/>

                <img src={image} alt="Students" width={558} height={504} loading="lazy" className="absolute -top-4 -left-4 z-10"/>
            </div>
        </div>
    )
}
export default Template;