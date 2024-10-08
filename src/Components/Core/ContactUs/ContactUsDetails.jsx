import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
    {
      icon: "HiChatBubbleLeftRight",
      heading: "Chat on us",
      description: "Our friendly team is here to help.",
      details: "info@studynotion.com",
    },
    {
      icon: "BiWorld",
      heading: "Visit us",
      description: "Come and say hello at our office HQ.",
      details:
        "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
      icon: "IoCall",
      heading: "Call us",
      description: "Mon - Fri From 8am to 5pm",
      details: "+123 456 7869",
    },
  ]
export default function ContactUsDetails(){
    return (
        <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
        {
            contactDetails.map((element,index)=>{
                let Icon=Icon1[element?.icon] || Icon2[element?.icon] || Icon3[element?.icon]
                return (
                    <div className="flex flex-col p-3 text-sm text-richblack-200 gap-1" key={index}>
                        <div className="flex flex-row gap-2 items-center">
                            <Icon size={25}/>
                            <p className="font-bold  text-richblack-5 text-lg">{element?.heading}</p>
                        </div>
                        <p className="font-medium ">{element?.description}</p>
                        <p className="font-semibold ">{element?.details}</p>
                    </div>
                )
            })
        }
        </div>
    )
}