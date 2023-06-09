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
        <div className="mt-[6.25rem] text-white">
            {/* section  */}
            <section>
                <div>
                    <header>
                    Driving Innovation in Online Education for a 
                    <HighLightedText text={"Brighter Future"}/>
                    <p>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </header>
                    <div className="flex gap-x-3">
                        <img src={Aboutus1}/>
                        <img src={Aboutus2}/>
                        <img src={Aboutus3}/>
                    </div>
                </div>
            </section>

            {/* section 2  */}

            <section>
                <div>
                    <Quote/>
                </div>
            </section>

            {/* section 3  */}
            <section>
                <div className="flex flex-col gap-y-4 text-white">
                    {/* 1 subsection  */}
                    <div>
                        <div className="flex gap-x-4">
                        <h1>
                        Our Founding Story 
                        </h1>
                        <p>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </p>
                        </div>
                        <div>
                            <img src={FoundingStory}/>
                        </div>
                    </div>

                    {/* 2 subsection  */}

                    <div className="flex gap-x-4">
                        <div>
                            <h1>Our Vision</h1>
                            <p>
                            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                            </p>
                        </div>
                        <div>
                            <h1>Our Mission</h1>
                            <p>
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
             <section>
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