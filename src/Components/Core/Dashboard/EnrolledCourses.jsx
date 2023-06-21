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
            setEnrolledCourses(response);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getEnrolledCourse()
    },[])

    return(
        <div className="text-white">
            <div>Enrolled Courses</div>
            {
                !enrolledCourses ? (
                    <div>
                        Loading....
                    </div>
                ): (!enrolledCourses.length ? (<p>You have not enrolled in any course yet.</p>) :(<AllEnrolledCourses enrolledCourses={enrolledCourses}/>))
            }
        </div>
    )
} 

export default EnrolledCourses;