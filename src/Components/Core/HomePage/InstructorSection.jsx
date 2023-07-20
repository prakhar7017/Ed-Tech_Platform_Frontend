import React from "react";
import InstructorImage from "../../../assets/Images/Instructor.png"
import HighLightedText from "./HighLightedText";
import Button from "./Button"
import {AiOutlineArrowRight} from "react-icons/ai"
const InstructorSection=()=>{
    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-20 items-center">

                <div className="lg:w-[50%]">
                    <img src={InstructorImage}
                        alt="InstructorImage"
                        loading="lazy"
                        className="shadow-white shadow-[-20px_-20px_0_0]"
                    />
                </div>

                <div className="lg:w-[50%] flex flex-col gap-10">
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
                </div>

                

            </div>

        </div>
    )
}

export default InstructorSection;