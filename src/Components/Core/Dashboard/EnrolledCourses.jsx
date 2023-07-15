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
            // console.log(response);
            setEnrolledCourses(response.data.courses);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getEnrolledCourse()
    },[])

    // console.log(enrolledCourses);

    return(
        <div className="text-white">
            <div>Enrolled Courses</div>
            {
                !enrolledCourses ? (
                    <div>
                        Loading....
                    </div>
                ): (!enrolledCourses ? (<p>You have not enrolled in any course yet.</p>) :(<AllEnrolledCourses enrolledCourses={enrolledCourses}/>))
            }
        </div>
    )
} 

export default EnrolledCourses;