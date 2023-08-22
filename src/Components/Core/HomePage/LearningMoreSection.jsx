import React,{useEffect,useRef} from "react";
import HighLightedText from "./HighLightedText";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import Button from "./Button"
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
const LearningMoreSection=()=>{
    const ref=useRef(null)
    const inView=useInView(ref,{once:true});
    const mainControl=useAnimation();
    useEffect(()=>{
        if(inView){
            mainControl.start("visible")
        }
    },[inView])
    return(
        <div>
            <div className="flex flex-col gap-5 items-center my-10">
                <div className="text-4xl font-semibold text-center">
                Your swiss knife for  
                <HighLightedText text={" learning any language"}/>
                </div>

                <div className="text-center text-richblack-600 mx-auto text-base mt-3 font-medium lg:w-[75%] leading-6"> 
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>

                <div ref={ref} className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
                    <motion.img variants={containerVarient} initial={"hiddenDown"} animate={mainControl} transition={"transition"} src={Know_your_progress}
                        alt="Know_your_progress" loading="lazy" className="object-fit lg:-mr-32"
                    />
                    <motion.img variants={containerVarient} initial={"hiddenUp"} animate={mainControl} transition={"transition"}  src={compare_with_others}
                        alt="compare_with_others" loading="lazy" className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
                    />
                    <motion.img variants={containerVarient} initial={"hiddenDown"} animate={mainControl} transition={"transition"}  src={plan_your_lessons}
                        alt="plan_your_lessons" loading="lazy" className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"
                    />
                </div>

                <div className="">
                    <Button active={true} linkto={"/signup"}>
                        Learn More
                    </Button>
                </div>

            </div>

        </div>
    )
}

export default LearningMoreSection;