import React from "react";
import { Link } from "react-router-dom";


const Button=({children,active,linkto})=>{
    return(
        <Link to={linkto}>
            <div className={`py-4 px-6   text-lg text-center text-white max-w-Contentfit max-h-Contentfit flex flex-row items-center justify-between gap-2 
            ${active ? "bg-yellow-50":"bg-richblack-800" } px-7 rounded-xl hover:scale-95 transition-all duration-200`}>
                {children}
            </div>
        </Link>
    )

}
export default Button