import ContactusForm from "../../Common/ContactUsForm"
export default function ContactForm(){
    return (
        <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 gap-3">
            <h1 className="text-4xl leading-10 font-semibold text-richblack-5">Got a Idea? We've got the skills. Let's team up</h1>
            <p className="text-richblack-200  text-base mt-4">Tell us more about yourself and what you're got in mind.</p>
            <div className="mt-7">
                <ContactusForm/>
            </div>
        </div>
    )
}