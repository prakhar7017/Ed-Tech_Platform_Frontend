import React from "react";
import HighLightedText from "../HomePage/HighLightedText";
import Button from "../HomePage/Button";

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];

const LearningGrid=()=>{
    return (
        <div className="grid grid-cols-1 lg:w-fit lg:grid-cols-4 mt-[6.5rem] mx-auto w-11/12 mb-[6.5rem] p-8">
            {
                LearningGridArray.map((element,index)=>(
                    <div key={index} className={`${index===0 && "lg:col-span-2 bg-transparent"} ${element.order % 2 === 1 ? "bg-richblack-700":"bg-richblack-800"} ${element.order===3 && "lg:col-start-2"}`}>
                        {
                            element.order < 0 ? 
                            (
                                <div className="flex flex-col gap-y-4 ">
                                    <div className="text-4xl font-semibold">{element.heading} <br></br>
                                    <HighLightedText text={element.highlightText}/></div>

                                    <p className="text-richblack-300 font-medium">{element.description}</p>

                                    <div className="max-w-fit text-richblack-900 mt-2 mb-2" >
                                      <Button active={true} linkto={element.BtnLink}>{element.BtnText}</Button>
                                    </div>

                                </div>
                            )  
                            : 
                            (
                                <div className="h-[18.375rem] flex flex-col  lg:items-center items-start text-center p-6 mx-auto ">
                                    <div className="text-richblack-5 text-lg ">{element.heading}</div>
                                    <p className=" mt-[2rem] lg:mt-[4rem] text-richblack-300">
                                        {element.description}
                                    </p>
                                </div>
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default LearningGrid;