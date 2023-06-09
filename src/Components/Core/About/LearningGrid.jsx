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
        <div className="grid grid-cols-1 lg:grid-cols-4 ">
            {
                LearningGridArray.map((element,index)=>(
                    <div key={index} className={`${index===0 && "lg:col-span-2 bg-transparent"} ${element.order % 2 === 1 ? "bg-richblack-700":"bg-richblack-800"} ${element.order===3 && "lg:col-start-2"}`}>
                        {
                            element.order < 0 ? 
                            (
                                <div>
                                    <div>{element.heading}</div>
                                    <HighLightedText text={element.highlightText}/>

                                    <p>{element.description}</p>

                                    <Button active={true} linkto={element.BtnLink}>{element.BtnText}</Button>

                                </div>
                            )  
                            : 
                            (
                                <div>
                                    <div>{element.heading}</div>
                                    <p>
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