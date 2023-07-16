import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {IoChevronBackCircle} from "react-icons/io";
import IconButton from "../../Common/IconButton";
import { Toaster } from "react-hot-toast";
import { AiOutlineDown } from "react-icons/ai"

export default function VideoDetailsSideBar({setReviewModal}){
    const navigate=useNavigate();
    const loaction=useLocation();

    const [activeStatus,setActiveStatus]=useState("");
    const [videobarActive,setVideobarActive]=useState("");
    const {sectionId,subSectionId}=useParams();

    const {courseSectionData,courseEntireData,completedLectures,totalNoOfLectures}=useSelector((state)=>state.viewCourse);

    useEffect(()=>{
        ;(()=>{
            if(!courseSectionData.length){
                return;
            }

            const currentSectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId);

            const currentSubSectionIndex=courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data)=>data?._id===subSectionId);

            const activeSubSectionId=courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id
            // set current section 
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            // set subsection 
            setVideobarActive(activeSubSectionId);

        })()
    },[courseSectionData,courseEntireData,loaction.pathname]);

    return (
        <>
            <div>
                <div>
                    <div>
                        <div onClick={()=>navigate("/dashboard/enrolled-courses")}>
                            <IoChevronBackCircle/>
                        </div>
                    </div>
                    <div>
                        <IconButton text={"Add Review"}
                            onclick={()=>setReviewModal(true)}
                        />
                    </div>
                    <div>
                        <p>{courseEntireData.courseName}</p>
                        <p>{completedLectures?.length} / {totalNoOfLectures}</p>
                    </div>
                </div>
                {/* for section and subsection  */}
                <div>
                    {
                        courseSectionData.map((section,index)=>(
                            <div
                             onClick={()=>setActiveStatus(section?._id)} key={index}>
                                <div>
                                    <p>{section?.sectionName}</p>
                                    <i><AiOutlineDown/></i>
                                </div>
                                {/* subsection  */}
                                <div>
                                    {
                                        activeStatus===section._id && (
                                            section.subSection.map((topic,index)=>(
                                                <div className={`flex gap-5 p-5 ${videobarActive===topic._id ? "bg-yellow-200 text-richblack-900" : "bg-richblack-900 text-richblack-5" } ?`} key={index} onClick={()=>{
                                                    navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                                    setVideobarActive(topic._id)
                                                }} >
                                                <input type="checkbox" checked={completedLectures.includes(topic?._id)}
                                                />

                                                </div>
                                            ))
                                        )
                                    }
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>

        </>
    )
}