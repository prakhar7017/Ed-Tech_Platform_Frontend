import React from "react";
import {AiOutlineArrowRight, AiOutlineFundProjectionScreen} from "react-icons/ai"
import { Link } from "react-router-dom";
import HighLightedText from "../Components/Core/HomePage/HighLightedText";
import Button from "../Components/Core/HomePage/Button";
import BannerVideo from "../assets/Images/banner.mp4"
import CodeBlocks from "../Components/Core/HomePage/CodeBlocks";
import gradaint  from "./BAckgroundGradient.css";
import TimeLineSection from "../Components/Core/HomePage/TimeLineSection";
import LearningMoreSection from "../Components/Core/HomePage/LearningMoreSection";
import InstructorSection from "../Components/Core/HomePage/InstructorSection";
import ExploreMore from "../Components/Core/HomePage/ExploreMore";
import Footer from "../Components/Common/Footer";
import ReviewSlider from "../Components/Common/ReviewSlider";
const Home=()=>{
    return (
        <div>
            {/* section 1 */}
            <div className="relative flex 
            gap-8 flex-col w-11/12 mx-auto items-center text-white justify-between max-w-maxContent">
                 <Link to={"/signup"}>
                <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none">
                    <div className="flex items-center justify-between gap-2 rounded-full px-10 py-[5px] transition-all duration-200 hover:bg-richblack-900">
                        <p >Become an Instructor</p>
                        <AiOutlineArrowRight/>
                    </div>
                </div>
                </Link>

                <div className="text-center font-semibold text-4xl ">
                    Empower Your Future with  <HighLightedText text={"Coding Skills"}/>
                </div>

                <div className="w-[90%] text-center text-lg font-bold mt-4 text-richblack-300">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className="flex flex-row gap-7 mt-4">
                    <Button active={true} linkto={"/signup"}>
                        Learn More
                    </Button>
                    <Button active={false} linkto={"/login"} >
                        Book a Demo
                    </Button>
                </div>

                <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                    <video muted autoPlay loop className="shadow-[20px_20px_rgba(255,255,255)]">
                        <source src={BannerVideo} type="video/mp4"/>
                    </video>
                </div>
                {/* code Section 1 */}
                <div>
                    <CodeBlocks 
                        backgroundGradient={<div className="codeblock1 absolute"></div>} 
                        position={"lg:flex-row"} 
                        heading={
                            <div className="font-semibold text-4xl ">
                                Unlock Your <HighLightedText text={"Coding Potential"}/> With Our Online Courses 
                            </div>}
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctabtn1={{btnText:"Try It Yourself",
                        linkto:"/signup",
                        active:true}}


                        ctabtn2={{btnText:"Learn More",
                        linkto:"/login",
                        active:false}}
                    
                        codeblocks={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css"\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
                        codeColor={"text-yellow-25"}
                    />
                </div>

                {/* code Section 1 */}
                <div>
                    <CodeBlocks backgroundGradient={<div className="codeblock2 absolute"></div>}
                    position={'lg:flex-row-reverse'} heading={<div className="text-4xl font-semibold">
                    Start <HighLightedText text={" Coding In Seconds"}/>
                    </div>}
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    ctabtn1={{btnText:"Continue Lesson",
                    linkto:"/signup",
                    active:true}}

                    ctabtn2={{btnText:"Learn More",
                    linkto:"/login",
                    active:false}}
                    
                    codeblocks={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css"\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
                    codeColor={"text-yellow-25"}
                    />
                </div>

                <ExploreMore/>
            </div>

            {/* ///////////////////////// /////////////////////////////////////////////////////////// */}
             
            {/* section 2  */}
            <div className="bg-pure-greys-5 text-richblack-700 ">
                <div className="homepage_bg h-[19.375rem]">

                    <div className="w-11/12 max-w-maxContent flex flex-col items-center mx-auto gap-8 justify-between">
                        <div className="lg:h-[9.375rem]"></div>
                            <div className="flex flex-row gap-7 text-white lg:mt-9">
                                <Button active={true} linkto={"/signup"}>
                                    <div className="flex items-center gap-2">
                                        Explore Full Catalog
                                        <AiOutlineArrowRight />
                                    </div>
                                </Button>
                                <Button active={false} linkto={"/signup"}>
                                    Learn More
                                    <AiOutlineArrowRight/>
                                </Button>
                            </div>
                    </div>


                </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
                    <div className="flex flex-col justify-between
                    lg:mt-20 lg:flex-row
                    lg:gap-0 gap-7 mb-10 mt-[-6.25rem]">
                        <div className="text-4xl font-semibold lg:w-[45%] ">
                        Get the skills you need for a <HighLightedText text={"job that is in demand."}/>
                        </div>

                        <div className="flex flex-col gap-10 lg:w-[40%] items-start">
                            <p className="text-[1rem]">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>

                            <Button active={true} linkto={"/signup"}>
                                Learn More
                            </Button>

                        </div>
                    </div>

                    <TimeLineSection/>

                    <LearningMoreSection/>
                </div>
            </div>

            {/* section 3  */}
            <div className="flex flex-col mx-auto max-w-maxContent w-11/12 items-center justify-between gap-8 bg-richblack-900 text-white ">

                <InstructorSection/>

                <h2 className="text-center text-4xl font-semibold mt-10">Review From Other Learners</h2>
                <ReviewSlider/>
            </div>

            {/* footer  */}
            <Footer/>
        </div>
    )
}


export default Home



