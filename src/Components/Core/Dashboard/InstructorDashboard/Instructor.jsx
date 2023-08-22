import { useState } from "react";
import { useEffect } from "react";
import { fetchInstructorCourses } from "../../../../Services/Operations/CourseAPI";
import { useSelector } from "react-redux";
import { getInstructorData } from "../../../../Services/Operations/ProfileAPI";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

export default function Instructor(){
    const [loading,setLoading]=useState(false);
    const [instructorData,setInstructorData]=useState(null)
    const {token}=useSelector((state)=>state.auth)
    const {user}=useSelector((state)=>state.profile)
    const [course,setCourse]=useState([]);
    useEffect(()=>{
        const getCourseStats=async ()=>{
            setLoading(true);
            const instructorApiData=await getInstructorData(token); 

            const result=await fetchInstructorCourses(token);

            if(instructorApiData){
                setInstructorData(instructorApiData);
            }

            if(result){
                setCourse(result);
            }
            setLoading(false);
        }
        getCourseStats();
    },[])

    const totalAmount=instructorData?.reduce((acc,curr)=>acc+=curr.totalAmount,0);
    const totalStudents=instructorData?.reduce((acc,curr)=>acc+=curr.totalStudent,0);

    // if(loading){

    // }

    return (
        <div className="text-white">
            <div className="space-y-2">
                <p className="text-2xl font-bold text-richblack-5">Hi {user?.firstName} {user?.lastName} 👋</p>
                <p className="font-medium text-richblack-200">Let's Start Something New</p>
            </div>
            {
                course?.length > 0 ? (
                    <div>
                        <div className="my-4 flex h-[450px] space-x-4">
                                <InstructorChart courses={instructorData}/>
                            <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
                                <p className="text-lg font-bold text-richblack-5">Statistics</p>
                                <div className="mt-4 space-y-4">
                                    <p className="text-lg text-richblack-200">Total Courses</p>
                                    <span className="text-3xl font-semibold text-richblack-50">
                                        {course.length}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-lg text-richblack-200">Total Students</p>
                                    <span className="text-3xl font-semibold text-richblack-50">
                                        {
                                            totalStudents
                                        }
                                    </span>
                                </div>
                                <div>
                                    <p lassName="text-lg text-richblack-200">Total Income</p>
                                    <span className="text-3xl font-semibold text-richblack-50">
                                        {
                                            totalAmount
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-md bg-richblack-800 p-6">
                            <div className="flex items-center justify-between">
                                <p className="text-lg font-bold text-richblack-5">Your Courses</p>
                                <Link to={"/dashboard/my-courses"}>
                                    <p className="text-xs font-semibold text-yellow-50">View All</p>
                                </Link>
                            </div>
                            <div className="my-4 flex items-start space-x-6">
                                {
                                    course.slice(0,3).map((cur,index)=>(
                                    <div className="w-1/3" key={index}>
                                        <img
                                            src={cur?.thumbnail}
                                            className="h-[201px] w-full rounded-md object-cover"
                                        />
                                        <div className="mt-3 w-full">
                                            <p className="text-sm font-medium text-richblack-50">{cur?.courseName}</p>
                                            <div className="mt-1 flex items-center space-x-2">
                                                <p className="text-xs font-medium text-richblack-300">{cur?.studentEnrolled.length} students</p>
                                                <p className="text-xs font-medium text-richblack-300">|</p>
                                                <p className="text-xs font-medium text-richblack-300">{cur?.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ) 
                :
                (
                    <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
                            <p className="text-center text-2xl font-bold text-richblack-5">No Course Created Yet</p>
                            <Link to={"/dashboard/add-course"}>
                                <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                                    Add Course
                                </p>
                            </Link>
                    </div>
                )
            }
        </div>
    )
}

                            

                        