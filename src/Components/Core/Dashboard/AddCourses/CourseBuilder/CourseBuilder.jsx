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
// import { MdToken } from "react-icons/md";
import NestedViewComponent from "./NestedView";

export default function CourseBuilder(){
    const dispatch=useDispatch();
    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    console.log(course.courseContent.lenght)

    const {register,handleSubmit,setValue,getValue,formState:{errors}}=useForm();

    const [editSectionName,setEditSectionName]=useState(null);

    const [loading,setLoading]=useState("false")

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
        }

        if(course.courseContent.some((section)=>section.subSection.length===0)){
            toast.error("Please Add Atleast One lecture in Section")
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
        <div>
            <p className="text-white">Course Builder</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="text-sm text-richblack-5">
                    Section Name 
                    <sup className="text-pink-200"> *</sup>
                    <input
                        id="sectionName"
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
                <div className="flex mt-10">
                    <IconButton type={"submit"}
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
                                className="text-sm text-richblack-50"
                            >
                                Cancel Edit
                            </button>
                        )
                    }
                </div>
            </form>

            {
                course.courseContent.lenght>0 && (
                    <NestedViewComponent handleChangeEditSection={handleChangeEditSection}/>
                )
            }
            <div>
                <button
                onClick={goBack}
                className="rounded-md cursor-pointer flex items-center bg-richblack-100"
                >
                    Back
                </button>
                <IconButton text={"next"} onclick={goToNext}>
                    <GrFormNext/>
                </IconButton>
            </div>
        </div>
    )
}