import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RenderSteps from "../AddCourses/RenderSteps";
import { useState } from "react";
import { useEffect } from "react";
import { getFullDetailsOfCourse } from "../../../../Services/Operations/CourseAPI";
import {setEditCourse,setCourse} from "../../../../Slices/courseSlice"

export default function EditCourse(){
    const dispatch=useDispatch();
    const {courseId}=useParams();

    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        const populateCourseDetails=async ()=>{
            setLoading(true);
            const result=await getFullDetailsOfCourse(courseId,token);
            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch((setCourse(result?.courseDetails)))
            }
            setLoading(false);
        }
        populateCourseDetails();
    },[])

    if(loading){
        return (<div>Loading...</div>)
    }

    return(
        <div>
            <h1>Edit Course</h1>
            <div>
                {
                    course ? <RenderSteps/> :(<p>No Course Found</p>)
                }
            </div>
        </div>
    )

}