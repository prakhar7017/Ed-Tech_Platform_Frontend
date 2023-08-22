import React,{useRef,useEffect} from "react";
import InstructorImage from "../../../assets/Images/Instructor.png"
import HighLightedText from "./HighLightedText";
import Button from "./Button"
import {AiOutlineArrowRight} from "react-icons/ai"
import {motion,useAnimation,useInView} from "framer-motion"
const containerVarient={
    hiddenLeft:{
        opacity:0,
        x:"-100vw"
    },
    hiddenRight:{
        opacity:0,
        x:"100vw"
    },
    visible:{
        opacity:1,
        x:0
    }
}

const InstructorSection=()=>{
    const ref=useRef(null);
    const inview=useInView(ref,{once:true});
    const mainControl=useAnimation();
    useEffect(()=>{
        if(inview){
            mainControl.start("visible")
        }

    },[inview])
    return (
        <div ref={ref}>
            <div className="flex flex-col lg:flex-row gap-20 items-center">

                <motion.div variants={containerVarient} initial={"hiddenLeft"} animate={mainControl} transition={{type:"spring",delay:0.5,duration:1}}  className="lg:w-[50%]">
                    <img src={InstructorImage}
                        alt="InstructorImage"
                        loading="lazy"
                        className="shadow-white shadow-[-20px_-20px_0_0]"
                    />
                </motion.div>

                <motion.div variants={containerVarient} initial={"hiddenRight"} animate={mainControl} transition={{type:"spring",delay:1}} className="lg:w-[50%] flex flex-col gap-10">
                    <div className="text-4xl font-semibold lg:w-[50%]">
                    Become an <HighLightedText text={" Instructor"}/>
                    </div>
                    <div className="font-medium text-[1rem] w-[90%] text-richblack-300">
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </div>

                    <div className="w-fit">
                        <Button active={true} linkto={"/signup"}>
                            <div className="flex flex-row gap-3 items-center">
                            Start Teaching Today
                            <AiOutlineArrowRight/>
                            </div>
                        </Button>
                    </div>
                </motion.div>

                

            </div>

        </div>
    )
}

export default InstructorSection;