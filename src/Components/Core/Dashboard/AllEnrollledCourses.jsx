import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";


const AllEnrolledCourses=({enrolledCourses})=>{
    const navigate=useNavigate();
    return(
        <div className="text-white">
            <div>
                <p>Course Name</p>
                <p>Duration</p>
                <p>Progress</p>
            </div>
            {
                enrolledCourses.map((course,index)=>(
                    <div key={index} 
                        onClick={() => {
                        navigate(
                            `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                        )
                        }}
                >
                        <div>
                            <img src={course.thumbnail}/>
                            <div>
                                <p>{course.courseName}</p>
                                <p>{course.courseDescription}</p>
                            </div>
                        </div>
                        <div>
                            {
                                course?.totalDuration
                            }
                        </div>
                        <div>
                                <p>Progress:{course.progressPercentage || 0 }%</p>
                                <ProgressBar completed={course?.progressPercentage}
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