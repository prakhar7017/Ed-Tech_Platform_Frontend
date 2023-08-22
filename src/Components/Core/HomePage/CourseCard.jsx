import React, { useEffect, useRef } from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
import {motion,useAnimation,useInView} from  "framer-motion"

const containerVarient={
    hiddenUp:{
        opacity:0,
        y:"-100vh"
    },
    hiddenDown:{
        opacity:0,
        y:"100vh"
    },
    visible:{
        opacity:1,
        y:"0"
    },
    transition:{
        type:"spring",
        delay:0.5,
        duration:1
    }
}

const CourseCard=({courseData,currentCard,setCurrentCard})=>{
    const ref=useRef(null)
    const inView=useInView(ref,{once:true});
    const mainControl=useAnimation();
    useEffect(()=>{
        if(inView){
            mainControl.start("visible")
        }
    },[inView])
    return (
        <div ref={ref} className={`w-[360px] lg:w-[30%] ${currentCard===courseData?.heading ?"bg-white shadow-[12px_12px_0_0] shadow-yellow-50":"bg-richblack-800"} text-richblack-25 h-[300px] box-border corsor-pointer`} onClick={()=>setCurrentCard(courseData?.heading)}>
            <motion.div variants={containerVarient} initial={"hiddenUp"} animate={mainControl} transition={"transition"} className={`border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3`}>
                    <div className={`${currentCard===courseData?.heading &&"text-richblack-800"} font-semibold text-[20px]}`} >
                        {courseData.heading}
                    </div>
                    <div className="text-richblack-400">
                        {courseData.description}
                    </div>
            </motion.div>

            <motion.div variants={containerVarient} initial={"hiddenDown"} animate={mainControl} transition={"transition"} className={`flex flex-row justify-between  ${currentCard===courseData?.heading ?"text-richblue-300":"bg-richblack-300"} font-medium px-6 py-3`}>

                    <div className={`flex flex-row justify-between items-center gap-2 text-[16px]`}>
                        <HiUsers/>
                        {courseData.level}
                    </div>
                    <div className="flex flex-row justify-between items-center gap-2 text-[16px]">
                        <ImTree/>
                        <p>{courseData.lessionNumber} Lesson</p>
                    </div>
            </motion.div>
        </div>
    )
}

export default CourseCard;