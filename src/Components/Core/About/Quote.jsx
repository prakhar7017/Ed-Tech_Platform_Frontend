import React from "react";
import HighLightedText from "../HomePage/HighLightedText";

const Quote=()=>{
    return (
        <div className="w-11/12 max-w-maxContent text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white">
            We are passionate about revolutionizing the way we learn. Our innovative platform
            <HighLightedText text={" combines technology "}/>,<span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">expertise</span>,
            and community to create 
            <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold"> an unparalleled educational experience.</span>
        </div>
    )
}

export default Quote;