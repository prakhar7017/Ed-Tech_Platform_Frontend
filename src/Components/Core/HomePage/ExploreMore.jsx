import React, { useState } from "react";
import {HomePageExplore} from "../../../data/homepage-explore";
import HighLightedText from "./HighLightedText";
import CourseCard from "./CourseCard";

const tabName=["Free","New to coding","Most popular","Skills paths","Career paths"]

const ExploreMore=()=>{
    const [currentTab,setCurrentTab]=useState(tabName[0]);
    const [course,setCourses]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading)

    const setMyCard=(value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter((element)=>element.tag===value);
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }
    return (
        <div>
            <div className="text-4xl font-semibold text-center">
                Unlock the <HighLightedText text={" Power of Code"}/> 
            </div>
            <div className="text-center text-richblack-300 text-md mt-3">
                <p>Learn to Build Anything You Can Imagine</p>
            </div>

            <div className=" hidden lg:flex flex-row
            mx-auto w-max rounded-full bg-richblack-800 border-richblack-100 -mt-5 p-1 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] gap-5">
                {
                    tabName.map((element,index)=>{
                        return (
                            <div key={index}
                            className={`text-[16px] flex flex-row gap-2 items-center ${currentTab===element ? 
                            "bg-richblack-900 text-richblack-500 font-medium":"text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                            onClick={()=>setMyCard(element)}>{element}
                            </div>
                        )
                    })
                }
            </div>

            {/* cards section  */}
            <div className="lg:h-[200px] lg:block hidden "></div>
                <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
                {
                    course.map((element,index)=>{
                            
                            return (
                            <CourseCard key={index}
                                courseData={element}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}
                            />
                        )
                    })
                }
                </div>
        </div>
    )
}

export default ExploreMore;
