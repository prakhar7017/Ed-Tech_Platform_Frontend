import React from "react";
import HighLightedText from "./HighLightedText";
import Button from "./Button"
import {AiOutlineArrowRight} from "react-icons/ai"
import { TypeAnimation } from "react-type-animation"

const CodeBlocks=({heading,position,subheading,ctabtn1,ctabtn2,codeblocks,backgroundGradient,codeColor})=>{
    return (
        <div className={`flex ${position} my-20 justify-between flex-col  lg:gap-10 gap-10`}>

            {/* section 1 */}
            <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
                {heading}
                <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
                    {subheading}
                </div>

                <div className="flex flex-row gap-7 mt-7">
                    <Button active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex items-centergap-2">
                            {ctabtn1.btnText}
                            <AiOutlineArrowRight/>
                        </div>

                    </Button>
                    <Button active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </Button>
                </div>
            </div>
            {/* section 2 */}
            <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] code-border">
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
            </div>

            
        </div>
    )
}

export default CodeBlocks;