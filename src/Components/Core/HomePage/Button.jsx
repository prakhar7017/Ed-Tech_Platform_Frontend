import React from "react";
import * as editIcon from "react-icons/lu"
import { Link } from "react-router-dom";


const Button=({children,active,linkto,textColor,icon})=>{
    const Icons=editIcon[icon]
    return(
        <Link to={linkto}>
            <div className={`py-4 px-6   text-lg text-center ${textColor ? `text-${textColor}` :"text-white"} max-w-Contentfit max-h-Contentfit flex flex-row items-center justify-between gap-2 
            ${active ? "bg-yellow-50":"bg-richblack-800" } px-7 rounded-xl hover:scale-95 transition-all duration-200 font-semibold`}>
                {children} 
                {icon && <Icons/>}
            </div>
        </Link>
    )

}
export default Button