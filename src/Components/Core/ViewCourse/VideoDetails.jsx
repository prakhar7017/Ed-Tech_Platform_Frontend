import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {markLectureAsComplete} from "../../../Services/Operations/CourseAPI"
import { updateCompletedLectures } from "../../../Slices/ViewCourseSlice";
import { Player } from 'video-react';
import '~video-react/dist/video-react.css';
import {BsFillCollectionPlayFill} from "react-icons/bs"
import IconButton from "../../Common/IconButton";
export default function VideoDetails(){

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const loaction=useLocation();

    const {courseId,sectionId,subSectionId}=useParams();
    const {token}=useSelector((state)=>state.token)
    const {courseSectionData,courseEntireData,completedLectures,totalNoOfLectures}=useSelector((state)=>state.viewCourse);

    const [videoData,setVideoData]=useState([]);
    const [videoEnded,setVideoEnded]=useState(false);
    const [loading,setLoading]=useState(false);


    const playRef=useRef();


    useEffect(()=>{
        const setVideo=async()=>{
            if(!courseSectionData.length){
                return;
            }
            if(!courseId || !sectionId || !subSectionId){
                navigate("/dashboard/enrolled-courses")

            }else{
                const filterData=courseSectionData?.filter((section)=>section._id===sectionId);

                const filterVideoData=filterData?.[0]?.subSection?.filter((data)=>data._id===subSectionId);

                setVideoData(filterVideoData[0])
                setVideoEnded(false);
            }
        }
        setVideo();
    },[courseSectionData,courseEntireData,loaction.pathname])


    const isFirstVideo=()=>{
        //jab section and subsection ki index 0 ho wo mera first lecture hh
        const currentSectionindex=courseSectionData.findIndex((section)=>section._id===sectionId);

        const currentSubSectionIndex=courseSectionData[currentSectionindex].subSection.findIndex((subSection)=>subSection._id===subSectionId)

        if(currentSectionindex===0 && currentSubSectionIndex===0){
            return true;
        }else{
            return false;
        }
    }
    const isLastVideo=()=>{
        const currentSectionindex=courseSectionData.findIndex((section)=>section._id===sectionId);

        const noofSubSection=courseSectionData[currentSectionindex].subSection.length;

        const currentSubSectionIndex=courseSectionData[currentSectionindex].subSection.findIndex((subSection)=>subSection._id===subSectionId)

        if(currentSectionindex=== courseSectionData.length-1 && currentSubSectionIndex===noofSubSection-1){
            return true;
        }else{
            return false;
        }
    }
    const goToNextVideo=()=>{
        const currentSectionindex=courseSectionData.findIndex((section)=>section._id===sectionId);

        const noofSubSection=courseSectionData[currentSectionindex].subSection.length

        const currentSubSectionIndex=courseSectionData[currentSectionindex].subSection.findIndex((subSection)=>subSection._id===subSectionId)

        if(currentSubSectionIndex!= noofSubSection-1){
            const nextSubSectionId=courseSectionData[currentSectionindex].subSection[currentSubSectionIndex+1]._id;

            // next video par jao
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        }else{
            const nextSectionId=courseSectionData[currentSectionindex+1]._id;
            const nextSubSectionId=courseSectionData[nextSectionId].subSection[0]._id

            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)

        }
    }
    const goToPrevVideo=()=>{
        const currentSectionindex=courseSectionData.findIndex((section)=>section._id===sectionId);

        const noofSubSection=courseSectionData[currentSectionindex].subSection.length

        const currentSubSectionIndex=courseSectionData[currentSectionindex].subSection.findIndex((subSection)=>subSection._id===subSectionId)

        if(currentSubSectionIndex!==0){
            const prevSubSectionId=courseSectionData[currentSectionindex].subSection[currentSubSectionIndex-1]._id

            navigate(`/view-course/${courseId}/section/${currentSectionindex}/sub-section/${prevSubSectionId}`)
        }else{
            const prevSectionId=courseSectionData[currentSectionindex-1]._id;

            const prevSubSectionId=courseSectionData[prevSectionId].subSection[-1]._id

            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
        }
    }
    const handleOnCompleteLecture=async()=>{
        setLoading(true);
        const result=await markLectureAsComplete({
            courseId:courseId,subSectionId:subSectionId
        },token)
        setLoading(false);
        if(result){
            dispatch(updateCompletedLectures(result));
        }
    }
    return (
        <div>
             {
                !videoData ? (<div>No Data Found</div>):(
                    <Player
                        ref={playRef}
                        aspectRatio="16:9"
                        playsInline
                        onEnded={()=>setVideoEnded(true)}
                        src={videoData?.videoUrl}
                    >
                    <BsFillCollectionPlayFill/>
                    {
                        videoEnded && (
                            <div>
                                {
                                    !completedLectures.includes(subSectionId) && (
                                        <IconButton
                                           disabled={loading}
                                           onclick={()=>handleOnCompleteLecture}
                                           text={!loading ? "Mark As Completed":"Loading..."} 
                                        />
                                    )
                                }
                                <IconButton
                                    disabled={loading}
                                    onclick={()=>{
                                        if(playRef?.current){
                                           playRef.current?.seek(0);
                                           setVideoEnded(false);
                                        }
                                    }}
                                    text={"Re-Watch"}
                                />
                                <div>
                                    {!isFirstVideo() && (
                                        <button disabled={loading} onClick={goToPrevVideo}>
                                            Previous
                                        </button>
                                    )}
                                    {!isLastVideo() && (
                                        <button disabled={loading} onClick={goToNextVideo}>
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    }
                    </Player>
                )
             }
             <h1>{videoData?.title}</h1>
             <p>{videoData?.description}</p>
        </div>
    )
}