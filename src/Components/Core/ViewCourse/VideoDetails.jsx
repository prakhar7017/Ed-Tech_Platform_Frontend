import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {markLectureAsComplete} from "../../../Services/Operations/CourseAPI"
import { updateCompletedLectures } from "../../../Slices/ViewCourseSlice";
import { Player,BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';
import {BsFillCollectionPlayFill} from "react-icons/bs"
import IconButton from "../../Common/IconButton";
export default function VideoDetails(){

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const loaction=useLocation();

    const {courseId,sectionId,subSectionId}=useParams();
    const {token}=useSelector((state)=>state.auth)
    const {courseSectionData,courseEntireData,completedLectures,totalNoOfLectures}=useSelector((state)=>state.viewCourse);

    const [videoData,setVideoData]=useState([]);
    const [videoEnded,setVideoEnded]=useState(false);
    const [loading,setLoading]=useState(false);
    const [previewSource, setPreviewSource] = useState("")


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
                setPreviewSource(courseEntireData.thumbnail)
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
        console.log(result);
        setLoading(false);

        if(result){
            dispatch(updateCompletedLectures(result));
        }
    }
    return (
        <div className="flex flex-col gap-5 text-white">
             {
                !videoData ? (<img
                    src={previewSource}
                    alt="Preview"
                    className="h-full w-full rounded-md object-cover"
                    />):(
                    <Player
                        ref={playRef}
                        aspectRatio="16:9"
                        playsInline
                        onEnded={()=>setVideoEnded(true)}
                        src={videoData?.videoUrl}
                    >
                    <BigPlayButton  position="center" />
                    {
                        videoEnded && (
                            <div  style={{
                                    backgroundImage:
                                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                                    }}
                                    className="full absolute inset-0 z-[100] grid 
                                    grid-cols-1 gap-2 h-full place-content-center font-inter mx-auto place-items-center "
                            >
                                {
                                    !completedLectures.includes(subSectionId) && (
                                        <IconButton
                                           disabled={loading}
                                           onclick={()=>handleOnCompleteLecture()}
                                           text={!loading ? "Mark As Completed":"Loading..."} 
                                           customClasses="text-xl max-w-max px-4 mx-auto"
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
                                    text="Rewatch"
                                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                                />
                                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                    {!isFirstVideo() && (
                                        <button disabled={loading} onClick={goToPrevVideo}
                                        className="text-richblack-800 bg-yello-50 max-w-maxContent rounded-md p-2">
                                            Previous
                                        </button>
                                    )}
                                    {!isLastVideo() && (
                                        <button disabled={loading} onClick={goToNextVideo}
                                        className="text-richblack-800 bg-yello-50 max-w-maxContent rounded-md p-2">
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
             <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
             <p className="pt-2 pb-6">{videoData?.description}</p>
        </div>
    )
}