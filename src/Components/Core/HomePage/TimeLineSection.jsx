import React,{useEffect,useRef} from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimeLineImage from "../../../assets/Images/TimelineImage.png"
import {motion,useAnimation,useInView} from "framer-motion"

const timeLineData=[
    {
        Logo:Logo1,
        heading:"Leadership",
        description:"Fully committed to the success company"
    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        description:"Students will always be our top priority"
    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        description:"The ability to switch is an important skills"
    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        description:"Code your way to a solution"
    },
]
const containerVarient={
    hiddenLeft:{
        opacity:0,
        x:"100vw"
    },
    hiddenRight:{
        opacity:0,
        x:"-100vw"
    },
    visible:{
        opacity:1,
        x:0
    }
}


const TimeLineSection=()=>{
    const ref=useRef(null);
    const inview=useInView(ref,{once:true});
    const mainControl=useAnimation();
    useEffect(()=>{
        if(inview){
            mainControl.start("visible")
        }

    },[inview])
    return (
        <div>
            <div ref={ref}  className="flex flex-col lg:flex-row gap-20 mb-20  items-center">

                <motion.div variants={containerVarient} initial={"hiddenLeft"} animate={mainControl} transition={{type:"spring",delay:0.5,duration:1}} className="lg:w-[45%] flex flex-col gap-14 lg:gap-3">
                    {timeLineData.map((element,index)=>{
                        return (
                            <div className={"flex flex-col lg:gap-3"} key={index}>
                                <div className="flex gap-6" key={index}>
                                    <div className="w-[3.25rem] h-[3.25rem] 
                                    rounded-full bg-white flex items-center justify-center
                                    shadow-[#00000012] shadow-[0_0_62px_0]">
                                        <img src={element.Logo}/>
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-[1.125rem] ">{element.heading}</h2>
                                        <p className="text-base">{element.description}</p>
                                    </div>
                                </div>
                                
                                <div className={`hidden ${
                                    timeLineData.length - 1 === index ? "hidden" : "lg:block"
                                }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}>
                                </div>
                            </div>   
                        )
                    })}
                </motion.div>
                
                <motion.div variants={containerVarient} initial={"hiddenRight"} animate={mainControl} transition={{type:"spring",delay:1}} className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">

                        <div className="absolute lg:bottom-0 bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase lg:py-10 gap-4 lg:0 lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%]">
                            <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
                                <p className="text-3xl font-bold">10</p>
                                <p className="text-caribbeangreen-300 text-sm">YEARS EXPERIENCES</p>
                            </div>

                            <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
                                <p className="text-3xl font-bold">250</p>
                                <p className="text-caribbeangreen-300 text-sm">TYPES OF
                                COURSES</p>
                            </div>
                        </div>
                        <img src={TimeLineImage}
                        alt="TimeLineImage"
                        loading="lazy"
                        className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
                        ></img>

                       
                </motion.div>

            </div>

            {/* ////////////  */}

        </div>
    )
}

export default TimeLineSection