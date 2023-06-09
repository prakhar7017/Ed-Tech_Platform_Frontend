import React from "react";
import HighLightedText from "../HomePage/HighLightedText";

const Quote=()=>{
    return (
        <div>
            We are passionate about revolutionizing the way we learn. Our innovative platform
            <HighLightedText text={" combines technology "}/>,<span>expertise</span>,
            and community to create 
            <span>an unparalleled educational experience.</span>
        </div>
    )
}

export default Quote;