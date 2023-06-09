import React from "react";

const HighLightedText=(props)=>{
    return (
        <span className="font-bold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
            {props.text}
        </span>
    )
}

export default HighLightedText