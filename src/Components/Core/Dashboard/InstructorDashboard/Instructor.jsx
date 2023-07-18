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
            <div>
                <p>{user?.firstName} {user?.lastName}</p>
                <p>Let's Start Something New</p>
            </div>
            {
                course?.length > 0 ? (
                    <div>
                        <div>
                            <div>
                                <InstructorChart courses={instructorData}/>
                            </div>
                            <div>
                                <p>Statistics</p>
                                <div>
                                    <p>Total Courses</p>
                                    <span>
                                        {course.length}
                                    </span>
                                </div>
                                <div>
                                    <p>Total Students</p>
                                    <span>
                                        {
                                            totalStudents
                                        }
                                    </span>
                                </div>
                                <div>
                                    <p>Total Income</p>
                                    <span>
                                        {
                                            totalAmount
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Your Courses</p>
                                <Link to={"/dashboard/my-courses"}>
                                    <p>View All</p>
                                </Link>
                            </div>
                            <div>
                                {
                                    course.slice(0,3).map((cur,index)=>(
                                    <div>
                                        <img
                                            src={cur?.thumbnail}
                                        />
                                        <div>
                                            <p>{cur?.courseName}</p>
                                            <div>
                                                <p>{cur?.studentEnrolled.length} students</p>
                                                <p>|</p>
                                                <p>{cur?.price}</p>
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
                    <div>
                            <p>No Course Created Yet</p>
                            <Link to={"/dashboard/add-course"}>
                                Add Course
                            </Link>
                    </div>
                )
            }
        </div>
    )
}

                            

                        