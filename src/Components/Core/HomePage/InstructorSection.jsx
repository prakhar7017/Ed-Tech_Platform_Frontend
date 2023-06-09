import React from "react";
import InstructorImage from "../../../assets/Images/Instructor.png"
import HighLightedText from "./HighLightedText";
import Button from "./Button"
import {AiOutlineArrowRight} from "react-icons/ai"
const InstructorSection=()=>{
    return (
        <div className="mt-24 ">
            <div className="flex flex-row gap-20 items-center">

                <div className="w-[50%] shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
                    <img src={InstructorImage}
                        alt="InstructorImage"
                        loading="lazy"
                        className="shadow-white shadow-lg "
                        style={{boxShadow:"rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(255, 255, 255) 20px 20px 0px 0px"}}
                    />
                </div>

                <div className="w-[50%] flex flex-col gap-10">
                    <div className="text-4xl font-semibold w-[50%]">
                    Become an <HighLightedText text={" Instructor"}/>
                    </div>
                    <div className="font-medium text-[16px] w-[80%] text-richblack-300">
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </div>

                    <div className="w-fit">
                        <Button active={true} linkto={"/signup"}>
                            <div className="flex flex-row gap-2 items-center">
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