import React, { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { createSubSection, updateSubSection } from "../../../../../Services/Operations/CourseAPI";
import {setCourse,setEditCourse,setStep} from "../../../../../Slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import {IoMdClose} from "react-icons/io";
import Upload from "../CourseInformation/Upload";
import IconButton from "../../../../Common/IconButton";

export default function SubSectionModal({modalData,setModalData,add=false,edit=false,view=false}){
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(false);
    const {token}=useSelector((state)=>state.auth);
    const {course}=useSelector((state)=>state.course);
    const {register,handleSubmit,formState:{errors},getValues,setValue}=useForm();
    

    useEffect(()=>{
        if(view || edit ){
            setValue("lectureTitle",modalData.title);
            setValue("lectureDesc",modalData.description);
            setValue("lectureVideo",modalData.videoUrl);
        }
    })
    const isFormUpdated=()=>{
        const currentValues=getValues();
        if(currentValues.lectureTitle!==modalData.title ||
            currentValues.lectureDesc!==modalData.description ||
            currentValues.lectureVideo!==modalData.videoUrl){
                return true;
            }else{
                return false;
            }
    }
    const handleEditSubSection=async()=>{
        const currentValues=getValues();
        const formData=new FormData();

        formData.append("sectionId",modalData.sectionId);
        formData.append("subSectionId",modalData._id);

        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title",currentValues.lectureTitle);
        }
        if(currentValues.lectureDesc !== modalData.description){
            formData.append("description",currentValues.lectureDesc);
        }
        if(currentValues.lectureVideo !== modalData.videoUrl){
            formData.append("video",currentValues.lectureVideo );
        }

        setLoading(true);
        const result=await updateSubSection(formData,token);
        if(result){
            const updatedCourseContent=course?.courseContent.map((section)=>section._id===modalData.sectionId ? result : section)
            const updatedCourse={...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    }
    const onSubmit=async (data)=>{
        if (view){
            return;
        }

        if(edit){
            if(!isFormUpdated){
                toast.error("OOPS... No Changes made yet");
            }else{
                handleEditSubSection();
            }
            return ;
        }

        const formData=new FormData();
        formData.append("sectionId",modalData);
        formData.append("title",data.lectureTitle);
        formData.append("description",data.lectureDesc);
        formData.append("video",data.lectureVideo);

        const result=await createSubSection(formData,token);

        if(result){
            const updatedCourseContent=course?.courseContent.map((section)=>section._id===modalData ? result : section)
            const updatedCourse={...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);

    }
    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">
                        {view && "Viewing "}
                        {add && "Adding "}
                        {edit && "Editing "}
                        Lecture
                    </p>
                    <button onClick={()=>(!loading ? setModalData(null):{})}>
                        <IoMdClose className="text-2xl text-richblack-5"/>
                    </button>
                </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">
                <Upload
                    name={"lectureVideo"}
                    label={"Lecture Video"} 
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                    video = {true}
                    viewData = {view ? modalData.videoUrl:null}
                    editData = {edit ? modalData.videoUrl:null}
                />
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5">
                        Lecture Title
                        <span className="text-pink-200"> *</span>
                        <input
                            id="lectureTitle"
                            disabled={view || loading }
                            name="lectureTitle"
                            placeholder="Enter lecture Title"
                            {...register("lectureTitle",{required:true})}
                            style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full mt-3 rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                            />
                        {errors.lectureTitle && (<span className="ml-2 text-xs tracking-wide text-pink-200">Lecture Title is required</span>)}
                    </label>
                    

                    <label className="text-sm text-richblack-5 mt-4">
                        Lecture Description{" "}
                        <span className="text-pink-200"> *</span>
                        <textarea
                            id="lectureDesc"
                            name="lectureDesc"
                            disabled={view || loading}
                            placeholder="Enter lecture Description"
                            {...register("lectureDesc",{required:true})}
                            style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                            className="w-full resize-x-none min-h-[130px] rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5 mt-2"
                            />
                            {errors.lectureDesc && (<span className="ml-2 text-xs tracking-wide text-pink-200">Lecture Description is required</span>)}
                    
                    </label>
                </div>
                {
                    !view && (
                        <div className="flex justify-end">
                            <IconButton
                                disabled={loading}
                                text={loading ? "Loading..." : edit ? "Save Changes" :"Save"}
                            />
                        </div>
                    )
                }
            </form>
        </div>
    </div>
    )
}