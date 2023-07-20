import React from "react";
import HighLightedText from "./HighLightedText";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import Button from "./Button"
const LearningMoreSection=()=>{
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

                <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
                    <img src={Know_your_progress}
                        alt="Know_your_progress" loading="lazy" className="object-fit lg:-mr-32"
                    />
                    <img src={compare_with_others}
                        alt="compare_with_others" loading="lazy" className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
                    />
                    <img  src={plan_your_lessons}
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