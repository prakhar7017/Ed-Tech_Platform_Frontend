import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import IconButton from "../../Common/IconButton";
import { toast } from "react-hot-toast";
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
            <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
                <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
                    <div className="flex w-full items-center justify-between ">
                        <div onClick={()=>navigate("/dashboard/enrolled-courses")
                        } className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
                        title="back">
                            <IoIosArrowBack size={30} />
                        </div>
                        <div>
                        <IconButton text={"Add Review"}
                            customClasses="ml-auto"
                            onclick={()=>setReviewModal(true)}
                        />
                    </div>
                    </div>
                   
                    <div className="flex flex-col">
                        <p>{courseEntireData.courseName}</p>
                        <p className="text-sm font-semibold text-richblack-500">{completedLectures?.length} / {totalNoOfLectures}</p>
                    </div>
                </div>
                {/* for section and subsection  */}
                <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
                    {
                        courseSectionData.map((section,index)=>(
                            <div
                                className="mt-2 cursor-pointer text-sm text-richblack-5"
                                onClick={()=>setActiveStatus(section?._id)} key={index}>
                                <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                                    <div className="w-[70%] font-semibold">
                                        <p>{section?.sectionName}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`${activeStatus === section?.sectionName ? "rotate-0" : "rotate-180" } transition-all duration-500`}
                                        >
                                            <BsChevronDown />
                                        </span>
                                    </div>
                                </div>
                                {/* subsection  */}
                                    {
                                        activeStatus===section._id && (
                                            <div className="transition-[height] duration-500 ease-in-out">
                                                {
                                                    section.subSection.map((topic,index)=>(
                                                <div className={`flex gap-3  px-5 py-2 ${videobarActive===topic._id ? "bg-yellow-200 text-richblack-800 font-semibold" : "hover:bg-richblack-900 text-richblack-5" } ?`} key={index} onClick={()=>{
                                                    navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                                    setVideobarActive(topic._id)
                                                }} >
                                                <input type="checkbox" checked={completedLectures.includes(topic?._id)}
                                                />
                                                    {topic.title}
                                                </div>
                                            ))
                                                }
                                            </div>
                                        )
                                    }

                            </div>
                        ))
                    }
                </div>
            </div>

        </>
    )
}