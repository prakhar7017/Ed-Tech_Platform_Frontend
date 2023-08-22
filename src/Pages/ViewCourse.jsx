import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../Services/Operations/CourseAPI";
import { setCourse } from "../Slices/courseSlice";
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../Slices/ViewCourseSlice";
import VideoDetailsSideBar from "../Components/Core/ViewCourse/VideoDetailsSideBar";
import CourseReviewModal from "../Components/Core/ViewCourse/CourseReviewModal";

export default  function ViewCourse(){

    const [reviewModal,setReviewModal]=useState(false);

    const {courseId}=useParams();
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    useEffect(()=>{
        const getFullDetails=async()=>{
            const result=await getFullDetailsOfCourse(courseId,token);
            console.log(result);
            if(result){
                dispatch(setCourseSectionData(result?.courseDetails?.courseContent));
                dispatch(setEntireCourseData(result?.courseDetails));
                dispatch(setCompletedLectures(result?.completedVideos))
                let lectures=0;
                result?.courseDetails?.courseContent?.forEach((sec) => {
                    lectures += sec.subSection.length;
                });
                dispatch(setTotalNoOfLectures(lectures));
            }
        }
        getFullDetails();
    },[])
    return (
        <>
            <div  className="relative flex min-h-[calc(100vh-3.5rem)]">
                <VideoDetailsSideBar setReviewModal={setReviewModal}/>
                <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                    <div className="mx-6">
                        <Outlet/>
                    </div>
                </div>
            </div>
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
        </>
    )
}