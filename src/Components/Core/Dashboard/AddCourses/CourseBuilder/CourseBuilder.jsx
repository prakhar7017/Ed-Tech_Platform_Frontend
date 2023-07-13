import React from "react";
import {useForm} from "react-hook-form"; 
import IconButton from "../../../../Common/IconButton";
import { useState } from "react";
import {FiPlusCircle} from "react-icons/fi"
import {GrFormNext} from "react-icons/gr"
import { useDispatch, useSelector } from "react-redux";
import {setEditCourse,setStep,setCourse} from "../../../../../Slices/courseSlice"
import { toast } from "react-hot-toast";
import { createSection, updateSection } from "../../../../../Services/Operations/CourseAPI";
import NestedViewComponent from "./NestedView";

export default function CourseBuilder(){
    const dispatch=useDispatch();
    const {course}=useSelector((state)=>state.course);
    // console.log(course);
    const {token}=useSelector((state)=>state.auth);

    const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm();

    const [editSectionName,setEditSectionName]=useState(null);

    const [loading,setLoading]=useState(false)

    const onSubmit=async (data)=>{

        setLoading(true);
        let result;

        if(editSectionName){
            result= await updateSection(
                {
                    sectionName:data.sectionName,
                    sectionId:editSectionName,
                    courseId:course._id,
                },
                token 
            )
        }else{
            result=await createSection({
                sectionName:data.sectionName,
                courseId:course._id,
            },token)
        }

        console.log(result);
        if(result){
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName","");
        }

        setLoading(false);
    }
    const cancelEdit=()=>{
        setEditSectionName(null);
        setValue("sectionName","")
    }

    const goBack=()=>{
        dispatch(setStep(1))
        dispatch(setEditCourse(true));
    }

    const goToNext=()=>{
        if(course.courseContent.length===0){
            toast.error("Please Add Atleast One Section")
            return;
        }

        if(course.courseContent.some((section)=>section.subSection.length===0)){
            toast.error("Please Add Atleast One lecture in Section")
            return;
        }

        dispatch(setStep(3));
    }

    const handleChangeEditSection=(sectionId,sectionName)=>{
        if(editSectionName===sectionId){
            cancelEdit();
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName",sectionName);
    }


    return (
        <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <label className="text-sm text-richblack-5">
                    Section Name 
                    <sup className="text-pink-200"> *</sup>
                    <input
                        id="sectionName"
                        disabled={loading}
                        name="sectionName"
                        placeholder="Add Section Name"
                        {...register("sectionName",{required:true})}
                        style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full mt-3 rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"

                    />
                    {
                        errors.sectionName && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Section Name is required
                            </span>
                        )
                    }
                </label>
                <div className="flex items-end gap-x-4">
                    <IconButton type={"submit"}
                    disabled={loading}
                        text={editSectionName ? "Edit Section Name" :"Create Section"}
                        outline={true}
                        customeClasses="text-white"
                    >
                        <FiPlusCircle className="text-yellow-50" size={20}
                        />
                    </IconButton>
                    {
                        editSectionName && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="text-sm text-richblack-300 underline"
                            >
                                Cancel Edit
                            </button>
                        )
                    }
                </div>
            </form>

            {
                course.courseContent.length > 0  && (
                    <NestedViewComponent handleChangeEditSection={handleChangeEditSection}/>
                )
            }
            <div className="flex justify-end gap-x-3">
                <button
                onClick={goBack}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >
                    Back
                </button>
                <IconButton disabled={loading} text={"Next"} onclick={goToNext}>
                    <GrFormNext/>
                </IconButton>
            </div>
        </div>
    )
}