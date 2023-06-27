import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {fetchCourseCategories,editCourseDetails,addCourseDetails} from "../../../../../Services/Operations/CourseAPI";
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import Requirement from "./Requirement";
import {setCourse,setStep} from "../../../../../Slices/courseSlice"
import IconButton from "../../../../Common/IconButton"
import { toast } from "react-hot-toast";
import {COURSE_STATUS} from "../../../../../Util/Contants"
import ChipsTag from "./ChipsTag";
import Upload from "./Upload";




export default function CourseInformationForm(){
    const {token}=useSelector((state)=>state.auth)
    const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm();

    const dispatch=useDispatch();

    const {course,editCourse}=useSelector((state)=>state.course);

    const [loading,setLoading] = useState(false);

    const [courseCategories,setCourseCategories]=useState([]);


    useEffect(()=>{
        const getCategories=async()=>{
            console.log("hello")
            setLoading(true); 
            const categories=await fetchCourseCategories();

            if(categories.length>0){
                setCourseCategories(categories);
            }

            setLoading(false);

            if(editCourse){
                setValue("courseTitle",course.courseName);
                setValue("courseShortDesc",course.courseDescription);
                setValue("coursePrice",course.price);
                setValue("courseTags",course.tag);
                setValue("courseBenefits",course.whatYouWillLearn);
                setValue("courseCategory",course.category);
                setValue("courseRequirements",course.instructions);
                setValue("courseImage",course.thumbnail);
            }

            getCategories();
        }
    },[])

    const isformUpdated=()=>{
        const currentValues=getValues();
        if(
            currentValues.courseTitle!==course.courseName || 
            currentValues.courseShortDesc!==course.courseDescription ||
            currentValues.coursePrice!==course.price ||
            // currentValues.courseTags.toString()!==course.tag.toString() ||
            currentValues.courseBenefits!==course.whatYouWillLearn ||
            currentValues.courseCategory!==course.category ||
            currentValues.courseRequirements.toString()!==course.instructions.toString() 
            // ||
            // currentValues.courseImage!==course.thumbnail 
            ){
            return true;
        }else{
            return false;
        }
    }

    const onSubmit=async(data)=>{
        if(editCourse){
            if(isformUpdated){
                const currentValues=getValues();
                const formData=new FormData();
    
                formData.append("courseId",course._id);
    
                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName",data.courseTitle);
                }
                if(currentValues.courseShortDesc!==course.courseDescription){
                    formData.append("courseDescription",data.courseDescription);
                }
                if(currentValues.coursePrice!==course.price){
                    formData.append("price",data.coursePrice);
                }
                if(currentValues.courseBenefits!==course.whatYouWillLearn){
                    formData.append("whatYouWillLearn",data.whatYouWillLearn);
                }
                if(currentValues.courseCategory._id!==course.c._id){
                    formData.append("whatYouWillLearn",data.courseCategory);
                }
                if(currentValues.courseRequirements.toString()!==course.instructions.toString()){
                    formData.append("instructions",data.courseRequirements);
                }
    
                setLoading(true);
                const result=await editCourseDetails(formData,token)
                setLoading(false);
                if(result){
                    setStep(2);
                    dispatch(setCourse(result))
                }
            }else{
                toast.error("Opps..!! No Changes made So far")
            }
            return;
        }

        const formData=new FormData();
        formData.append("courseName",data.courseTitle);
        formData.append("courseDescription",data.courseShortDesc);
        formData.append("price",data.coursePrice);
        formData.append("whatYouWillLearn",data.courseBenefits);
        formData.append("category",data.courseCategory);
        formData.append("instructions",JSON.stringify(data.courseRequirements));
        formData.append("category",data.courseCategory);
        formData.append("status",COURSE_STATUS.DRAFT)

        setLoading(true);
        const result=await addCourseDetails(formData,token);
        if(result){
            setStep(2);
            dispatch(setCourse(result));
        }
        setLoading(false);

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"> 
            <div className="flex flex-col space-y-2">
                <label  className="text-sm text-richblack-5">
                    <p>Course Title<sup className="text-pink-200">*</sup></p>
                    <input
                        type="text"
                        id="courseTitle"
                        placeholder="Enter Course Title"
                        style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full mt-3 rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                        {...register("courseTitle",{required:true})}
                    />
                    {
                        errors.courseTitle && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Please Enter Course Title</span>
                        )
                    }
                </label>
            </div>
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5">
                    <p>Course Short Description<sup className="text-pink-200">*</sup></p>
                    <textarea
                        id="courseShortDesc"
                        placeholder="Enter Course Description"
                        style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="resize-x-none min-h-[130px] w-full mt-3 rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                        {...register("courseShortDesc",{required:true})}
                    />
                    {
                        errors.courseShortDesc && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Please Enter Course Description</span>
                        )
                    }
                </label>
            </div>
            <div className="flex flex-col space-y-2">
                <label className=" relative text-sm text-richblack-5">
                    <p>Course Price<sup className="text-pink-200">*</sup></p>
                    <input
                        id="coursePrice"
                        placeholder="Enter Course Price"
                        style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full mt-3 pl-12 rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                        {...register("coursePrice",{required:true,
                        valueAsNumber:true,
                        pattern: {
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        }
                        })}
                    />
                    <span className="absolute left-3 -bottom-0 inline-block -translate-y-1/2 text-2xl text-richblack-400"><HiOutlineCurrencyRupee/></span>
                    {
                        errors.coursePrice && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Please Enter Course Price</span>
                        )
                    }
                </label>
            </div>
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5">
                    <p>Course Category<sup className="text-pink-200">*</sup></p>
                    <select
                        id="courseCategory"
                        placeholder="Enter Course Category"
                        defaultValue=""
                        style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full mt-3  rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                        {...register("courseCategory",{required:true,
                        })}
                    >
                        <option value="" disabled>Choose a Category</option>
                        {
                            !loading && courseCategories.map((element,index)=>(
                                <option key={index} value={element?.id}>
                                    {element?.name}
                                </option>
                            ))
                        }
                    </select>
                    {
                        errors.courseCategory && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Please Enter Course Category</span>
                        )
                    }
                </label>
            </div>
            {/* custome component for tag  */}
            <ChipsTag name={"courseTags"} label={"Tags"} register={register} errors={errors} setValue={setValue} getValue={getValues} placeHolder={"Enter Tags and press enter"}/>
            {/* custome component for uploading media  */}
            <Upload name={"courseImage"} label={"Thumbnail"} register={register} errors={errors} setValue={setValue} getValue={getValues} placeHolder={"Drag and Drop Here"}/>

            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5">
                    <p>Benefits of the course <sup className="text-pink-200">*</sup></p>
                    <textarea
                        id="courseBenefits"
                        placeholder="Enter benefits of the course"
                        style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="resize-x-none min-h-[130px] w-full mt-3 rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                        {...register("courseBenefits",{required:true})}
                    />
                    {
                        errors.courseBenefits && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Please Enter benefits of the course</span>
                        )
                    }
                </label>
            </div>
            <Requirement name={"courseRequirements"} label={"Requirements/Instructions"} register={register} errors={errors} setValue={setValue} getValue={getValues}/>
            <div>
                {
                    editCourse && (
                        <button
                        onClick={()=>dispatch(setStep(2))}>
                            Continue without saving
                        </button>
                    )
                }
                <IconButton text={!editCourse ? "Next" : "Save Changes"}/>
            </div>
        </form>
    )
}