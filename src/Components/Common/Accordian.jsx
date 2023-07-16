import { AiOutlineDown } from "react-icons/ai"
import {BiVideo} from "react-icons/bi"
import { useRef } from "react"
import { useState } from "react";
import { useEffect } from "react";
import AccordianSubSection from "./AccordianSubSection";

export default function Accordian({course,isActive,handelisActive}){

    const contentDiv=useRef(null);

    const [active,setActive]=useState(false);
    useEffect(()=>{
        setActive(isActive?.includes(course._id))
    },[isActive])

    const [sectionHeight,setSectionHeight]=useState(0);
    useEffect(()=>{
        setSectionHeight(active ? contentDiv.current.scrollHeight:0)
    },[active])
    return(
        <div className="overflow-hidden border border-richblack-600 border-solid bg-richblack-700 text-richblack-5 last:mb-0 ] ">
            <div>
                <div className="flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-6s transition-[0.3s]" onClick={()=>handelisActive(course._id)}>
                    <div className="flex items-center gap-2">
                        <i className={isActive.includes(course._id) ? "rotate-180" : "rotate-0"}><AiOutlineDown /></i>
                        <p>{course?.sectionName}</p>
                    </div>
                    <div className="space-x-4">
                        <span className="text-yellow-25">
                            {
                                `${course?.subSection?.length || 0 } lecture(s)`
                            }
                        </span>
                    </div>
                </div>
            </div>
            <div ref={contentDiv} className="relative h-0 bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]" style={{height:sectionHeight}}>
                <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
                    {
                        course?.subSection?.map((subSec,index)=>(
                            <AccordianSubSection subSec={subSec} key={index}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )   
}