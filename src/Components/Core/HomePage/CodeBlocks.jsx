import React, { useEffect, useRef } from "react";
import HighLightedText from "./HighLightedText";
import Button from "./Button"
import {AiOutlineArrowRight} from "react-icons/ai"
import { TypeAnimation } from "react-type-animation"
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

const CodeBlocks=({heading,position,subheading,ctabtn1,ctabtn2,codeblocks,backgroundGradient,codeColor})=>
{
    const ref=useRef(null);
    const inview=useInView(ref,{once:true});
    const mainControl=useAnimation();
    useEffect(()=>{
        if(inview){
            mainControl.start("visible")
        }

    },[inview])
    return (
        <div ref={ref} className={`flex ${position} my-20 justify-between flex-col  lg:gap-10 gap-10`}>

            {/* section 1 */}
            <motion.div variants={containerVarient} initial={"hiddenLeft"} animate={mainControl} transition={{type:"spring",delay:0.5,duration:1}} className="w-[100%] lg:w-[50%] flex flex-col gap-8">
                {heading}
                <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
                    {subheading}
                </div>

                <div className="flex flex-row gap-7 mt-7">
                    <Button active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex items-center gap-2">
                            {ctabtn1.btnText}
                            <AiOutlineArrowRight/>
                        </div>

                    </Button>
                    <Button active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </Button>
                </div>
            </motion.div>
            {/* section 2 */}
            <motion.div variants={containerVarient} initial={"hiddenRight"} animate={mainControl} transition={{type:"spring",delay:1}} className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] code-border">
                {/* hw bg gradient  */}
                {backgroundGradient}
                <div className="" style={{backgroundColor:"#000814",boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)"}}>

                </div>
                <div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold ">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
                    <TypeAnimation sequence={[codeblocks,1000,""]}
                    repeat={Infinity}
                    cursor={true} 
                    style={{
                        whiteSpace:"pre-line",
                        display:"block"
                    }}
                    omitDeletionAnimation={true}/>
               </div>
            </motion.div>

            
        </div>
    )
}

export default CodeBlocks;