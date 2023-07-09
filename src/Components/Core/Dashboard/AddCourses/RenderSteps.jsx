import React from "react";
import { useSelector } from "react-redux";
import {FaCheck} from "react-icons/fa";
import CourseBuilder from "./CourseBuilder/CourseBuilder";
import PublishCourse from "./PublishCourse";
import CourseInformationForm from "./CourseInformation/CourseInfomationForm";


export default function RenderSteps(){

    const {step}=useSelector((state)=>state.course)

    const Steps=[
        {
            id:1,
            title:"Course Information"
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        },
    ]
    return (
        <>
            <div className="relative mb-2 flex w-full justify-center">
                {Steps.map((element)=>(
                    <>
                        <div className="flex flex-col items-center" key={element.id}>
                            <div className={`flex flex-row cursor-default aspect-square w-[34px] items-center justify-center rounded-full border-[1px]
                            ${step===element.id ? "border-yellow-50 bg-yellow-900 text-yellow-50" :"border-richblack-700 bg-richblack-800 text-richblack-300"}
                             ${ step>element.id && "bg-yellow-50 text-yellow-50"}`
                            }>
                                {
                                    step > element.id ? (<FaCheck className="font-bold text-richblack-900"/>) 
                                    : (element.id)
                                }
                            </div>
                        </div>
                        {/* add code for dashes between the lables*/}
                            {
                                element.id!==Steps.length && (
                                    <>
                                        <div className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${step > element.id  ? "border-yellow-50" : "border-richblack-500"} `}>
                                        </div>
                                    </>
                                )
                            }
                    </>
                ))}
            </div>
            <div className="relative mb-16 flex w-full select-none justify-between">
                {Steps.map((element,index)=>(
                    <>
                        <div className="flex min-w-[130px] flex-col items-center gap-y-2"  key={element.id}>
                            <p className={`text-sm ${step >= element.id ? "text-richblack-5" :"text-richblack-500"}`}>
                                {element.title}
                            </p>
                        </div>
                    </>
                ))}
            </div>
            {
                step === 1 && <CourseInformationForm/>
            }
            {
                step === 2 && <CourseBuilder/>
            }

            {/* {
                step === 3 && <PublishCourse/>
            }  */}
        </>
    )
}