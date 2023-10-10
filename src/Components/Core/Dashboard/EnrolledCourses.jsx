import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourse }from "../../../Services/Operations/ProfileAPI"
import AllEnrolledCourses  from "./AllEnrollledCourses";

const EnrolledCourses=()=>{
    const {token}=useSelector((state)=>state.auth)
    const [enrolledCourses,setEnrolledCourses]=useState(null);

    const getEnrolledCourse=async()=>{
        try {
            const response=await getUserEnrolledCourse(token);
            const filterPublishCourses=response.filter((element)=>element.status!="Draft")
            setEnrolledCourses(filterPublishCourses);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getEnrolledCourse()
    },[])

    return(
        <div className="text-white">
            <div className="text-3xl text-richblack-50">Enrolled Courses</div>
            {
                !enrolledCourses ? (
                    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                        <div class="spinner">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div> 
                            <div></div>
                        </div>
                    </div>
                    
                ): (!enrolledCourses ? (<p className="grid h-[10vh] w-full place-content-center text-richblack-5">You have not enrolled in any course yet.</p>) :(<AllEnrolledCourses enrolledCourses={enrolledCourses}/>))
            }
        </div>
    )
} 

export default EnrolledCourses;