import React from "react";
import RenderSteps from "./RenderSteps";
import {FcFlashOn} from "react-icons/fc"

export default function AddCourse(){

    const instruction=[
        "Set the Course Price option or make it free.","Standard size for the course thumbnail is 1024x576.",
        "Video section controls the course overview video.",
        "Course Builder is where you create & organize a course.",
        "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
        "Information from the Additional Data section shows up on the course single page.",
        "Make Announcements to notify any important",
        "Notes to all enrolled students at once."
    ]
    return (
        <>
            <div className="flex w-full items-start gap-x-6">
                <div className="flex flex-1 flex-col">
                    <h1 className="mb-14 text-3xl font-medium text-richblack-5">Add Course</h1>

                    <div className="flex-1">
                        <RenderSteps/>
                    </div>
                </div>
                <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
                   <div className="flex gap-x-2  items-baseline ">
                        <FcFlashOn className="text-xl"/>
                        <p className="mb-8 text-lg text-richblack-5">Course Upload Tips</p>
                   </div>
                    <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
                        {
                            instruction.map((element,index)=>{
                                return (
                                    <li key={index}>{element}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}