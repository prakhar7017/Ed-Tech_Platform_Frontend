import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {GrFormNext} from "react-icons/gr"
import {setStep,setEditCourse,setCourse,resetCourseState} from "../../../../../Slices/courseSlice"
import IconButton from "../../../../Common/IconButton";
import { COURSE_STATUS } from "../../../../../Util/Contants";
import { editCourseDetails } from "../../../../../Services/Operations/CourseAPI";
import { useNavigate } from "react-router-dom";

export default function PublishCourse(){

    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm();
    const [loading,setLoading]=useState();
    const dispatch=useDispatch();
    const navigate=useNavigate();


    useEffect(()=>{
        if(course?.status===COURSE_STATUS.PUBLISHED){
            setValue("public",true);
        }
    },[])
    const goToCourse=()=>{
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const onSubmit=async(data)=>{

        if((course?.status===COURSE_STATUS.PUBLISHED && getValues("public")===true) || (course?.status===COURSE_STATUS.DRAFT && getValues("public")===false)){
            goToCourse();
            return;
        }

        const formData=new FormData();
        formData.append("courseId",course._id);
        const courseStatus=getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        console.log(courseStatus);
        formData.append("status",courseStatus);
        

        setLoading(true);
        const result=await editCourseDetails(formData,token);
        if(result){
            console.log("hi")
            goToCourse();
        }
        setLoading(false);
    }
    const goBack=()=>{
        dispatch(setStep(2));
    }

    return(
        <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5 mb-2">Publish Course</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-y-5 ">
                    <label className="inline-flex items-center text-lg ">
                        <input
                        type="checkbox"
                        id="public"
                        {...register("public")}
                        className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                        />
                        <span className="ml-2 text-richblack-400">
                            Make this course as public
                        </span>
                    </label>

                    <div className="ml-auto flex max-w-max items-center gap-x-4 ">
                        <button
                        disabled={loading}
                        onClick={goBack}
                        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                        >
                            Back
                        </button>
                        <IconButton disabled={loading} text={"Save Changes"} >
                            <GrFormNext/>
                        </IconButton>
                    </div>
                </div>
            </form>
        </div>
    )
}