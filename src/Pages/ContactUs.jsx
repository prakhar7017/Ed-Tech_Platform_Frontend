import React from "react";
import Footer from ".././Components/Common/Footer"
import ContactUsDetails from "../Components/Core/ContactUs/ContactUsDetails";
import ContactForm from "../Components/Core/ContactUs/ContactForm";
import ReviewSlider from "../Components/Common/ReviewSlider"

const ContactUs=()=>{
    return(
        <div className="text-white">
            {/* section 1 */}
            <section className=" flex w-11/12 mx-auto lg:flex-row flex-col mt-20 justify-between items-start max-w-maxContent gap-10 text-white">
                <div>
                    <ContactUsDetails/>
                </div>
                <div>
                    <ContactForm/>
                </div>
            </section>
            {/* section 2  slider*/}
            <div>
                <h1 className="text-center text-4xl font-semibold mt-8">
                    Reviews from other learners
                </h1>
                <ReviewSlider/>
            </div>
            {/* section 3 */}
            <section>
                <Footer/>
            </section>
        </div>
    )
}

export default ContactUs;