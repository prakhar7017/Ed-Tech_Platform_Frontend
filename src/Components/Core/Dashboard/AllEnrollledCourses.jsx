import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";


const AllEnrolledCourses=({enrolledCourses})=>{
    return(
        <div>
            <div>
                <p>Course Name</p>
                <p>Duration</p>
                <p>Progress</p>
            </div>
            {
                enrolledCourses.map((course,index)=>{
                    <div>
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
                })
            }
        </div>
    )
}

export default AllEnrolledCourses;