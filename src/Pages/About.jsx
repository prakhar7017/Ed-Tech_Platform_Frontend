import React from "react";
import HighLightedText from "../Components/Core/HomePage/HighLightedText";
import Aboutus1  from "../assets/Images/aboutus1.webp"
import Aboutus2  from "../assets/Images/aboutus2.webp"
import Aboutus3  from "../assets/Images/aboutus3.webp"
import FoundingStory from ".././assets/Images/FoundingStory.png"
import Quote from "../Components/Core/About/Quote";
import Stats from "../Components/Core/About/StatsComponent";
import LearningGrid from "../Components/Core/About/LearningGrid";
import ContactForm from "../Components/Core/About/ContactForm";
import Footer from "../Components/Common/Footer";
const About=()=>{
    return (
        <div className=" text-white  w-[100%]">
            {/* section  */}
            <section className="bg-richblack-700 h-[30rem]">
                <div className="w-11/12 max-w-maxContent  relative mx-auto flex-col justify-between gap-10 text-center text-white">
                    <div className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
                        <header className="text-center font-inter text-[2.25rem] leading-[2.75rem] font-semibold mb-[1rem] lg:mt-[1rem]">
                        Driving Innovation in Online Education for a 
                        <HighLightedText text={" Brighter Future"}/>
                        </header>
                        <p className="text-[1rem] text-center text-richblack-300 font-medium leading-[1.5rem] ">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </div>

                    <div className="flex gap-x-4 justify-between items-center top-[300px] absolute ">
                        <img src={Aboutus1}  className=" w-[24rem] h-[19.438rem] scale-100  "/>
                        <img src={Aboutus2}/>
                        <img src={Aboutus3}/>
                    </div>
                </div>
            </section>

            {/* section 2  */}

            <section >
                <div className="mt-[10rem]">
                    <Quote/>
                </div>
            </section>

            {/* section 3  */}
            <section>
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-10 text-richblack-300">
                    {/* 1 subsection  */}
                    <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
                        <div className="my-24 flex lg:w-[50%] flex-col gap-10">
                            <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">
                                Our Founding Story 
                            </h1>
                            <p className="text-1 leading-[1.5rem] font-inter">
                            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </p>
                            <p className="text-1 leading-[1.5rem] font-inter">
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                            </p>
                        </div>
                        <div className="shadow-[0_0_20px_0] shadow-[#FC6767]">
                            <img src={FoundingStory}/>
                        </div>
                    </div>

                    {/* 2 subsection  */}

                    <div className="flex items-center lg:gap-x-40 lg:flex-row justify-between">
                        <div className="my-24 flex lg:w-[50%] flex-col gap-10 justify-between items-center">
                            <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">Our Vision</h1>
                            <p className="text-1 leading-[1.5rem] font-inter">
                            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                            </p>
                        </div>
                        <div className="my-24 flex lg:w-[50%] flex-col gap-10 justify-betweet items-center">
                            <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%]">Our Mission</h1>
                            <p className="text-1 leading-[1.5rem] font-inter">
                            our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* section 4 */}
            <section>
                <Stats/>
            </section>

            {/* section 5 */}
             <section className='mx-auto flex flex-col items-center justify-between gap-5 mb-[140px]'>
                <LearningGrid/>
                <ContactForm/>
             </section>

             {/* section 6  */}
             <section>
                <Footer/>
             </section>
        </div>
    )
}

export default About;