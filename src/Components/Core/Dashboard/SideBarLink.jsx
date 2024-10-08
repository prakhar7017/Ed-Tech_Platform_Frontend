import React from "react";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";


const SideBarLink=({link,iconName})=>{

    const Icon=Icons[iconName];
    const location=useLocation();
    const dispatch=useDispatch();

    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname)
    }

    return (
        <div className="flex items-center justify-start ">
            <NavLink to={link.path} className={`${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50 bg-opacity-100  ":"bg-opacity-0 text-richblack-300"} relative px-8 py-2 text-sm font-medium  transition-all duration-200 active w-[220px]`}>
                <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span>

                <div className="flex flex-center gap-x-2">
                    <Icon className="text-lg"/>
                    <span>{link.name}</span>
                </div>
            </NavLink>
        </div>
    )

}

export default SideBarLink;