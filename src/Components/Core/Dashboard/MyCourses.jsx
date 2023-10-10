import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../Services/Operations/CourseAPI";
import IconButton from "../../Common/IconButton";
import CourseTable from "./AddCourses/InstructorCourses/CoursesTable";
import {AiOutlinePlus} from "react-icons/ai";

export default function MyCourses(){
    const {token}=useSelector((state)=>state.auth);
    const [courses,setCourses]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
        const fetchCourses=async ()=>{
            const result=await fetchInstructorCourses(token);
            console.log(result);
            if(result){
                setCourses(result);
            }
        }
        fetchCourses();
    },[])


    return (
        <div>
            <div className="flex lg:flex-row justify-between items-center">
                <h1 className="text-richblack-5 text-3xl font-medium ">My Courses</h1>
                <IconButton text={"Add Courses"} onclick={()=>navigate("/dashboard/add-course")}><AiOutlinePlus/></IconButton>
            </div>

            {
                courses && <CourseTable courses={courses} setCourses={setCourses}/>
            }
        </div>
    )
}