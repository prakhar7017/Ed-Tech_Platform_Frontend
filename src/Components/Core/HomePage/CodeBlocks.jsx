import React from "react";
import HighLightedText from "./HighLightedText";
import Button from "./Button"
import {AiOutlineArrowRight} from "react-icons/ai"
import { TypeAnimation } from "react-type-animation"

const CodeBlocks=({heading,position,subheading,ctabtn1,ctabtn2,codeblocks,backgroundGradient,codeColor})=>{
    return (
        <div className={`flex ${position} my-20 justify-evenly  gap-10 w-[100%] max-h-72  items-baseline  `}>

            {/* section 1 */}
            <div className="w-[50%] max-h-fitContent flex flex-col gap-2 text-white">
                {heading}
                <div className="text-richblack-300 font-bold text-base m-3 ">
                    {subheading}
                </div>

                <div className="flex flex-row gap-7 mt-7">
                    <Button active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        {ctabtn1.btnText}
                        <AiOutlineArrowRight/>
                    </Button>
                    <Button active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </Button>
                </div>
            </div>
            {/* section 2 */}
            <div className="h-fit flex flex-row text-[15px] w-[100%] justify-between items-baseline py-4 lg:w-[500px]">
                {/* hw bg gradient  */}
                <div className="background">

                </div>
                <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
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
                <div className={`w-[90%] flex flex-col gap-2 font-vold font-mono ${codeColor} pr-2`}>
                    <TypeAnimation sequence={[codeblocks,2000,""]}
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