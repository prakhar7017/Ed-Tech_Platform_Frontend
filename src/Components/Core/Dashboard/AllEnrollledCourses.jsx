import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";


const AllEnrolledCourses=({enrolledCourses})=>{
    const navigate=useNavigate();
    return(
        <div className="text-white mt-4">
            <div  className="flex rounded-t-lg bg-richblack-500 ">
                <p className="w-[45%] px-5 py-3">Course Name</p>
                <p className="w-1/4 px-2 py-3">Duration</p>
                <p className="flex-1 px-2 py-3">Progress</p>
            </div>
            {
                enrolledCourses.map((course,index,arr)=>(
                    <div key={index} 
                        className={`flex items-center border border-richblack-700 ${index==arr.length-1 ? "rounded-b-lg":"rounded-none"}`}
                    >
                        <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                            onClick={() => {
                                 navigate(
                                  `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                )
                            }}>
                                    <img src={course.thumbnail} className="h-14 w-14 rounded-lg object-cover" alt="course_img"/>
                                    <div className="flex max-w-xs flex-col gap-2">
                                        <p className="font-semibold">{course.courseName}</p>
                                        <p className="text-xs text-richblack-300">{course.courseDescription.length>50 ? `${course.courseDescription.slice(0,50)}...`: course.courseDescription}</p>
                                    </div>
                        </div>

                        
                        <div className="w-1/4 px-2 py-3">
                            <span>{`${course?.totalDuration}s`}</span>
                        </div>
                        <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                <p>Progress:{course.progressPercentage || 0 }%</p>
                                <ProgressBar 
                                    completed={course?.progressPercentage || 0}
                                    height="8px"
                                    isLabelVisible={false}
                                />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default AllEnrolledCourses;