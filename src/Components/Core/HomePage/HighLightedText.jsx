import React from "react";

const HighLightedText=(props)=>{
    return (
        <span className="font-bold text-blue-500">
            {props.text}
        </span>
    )
}

export default HighLightedText