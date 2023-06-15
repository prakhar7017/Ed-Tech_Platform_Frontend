import React from "react";
import { useSelector } from "react-redux";
import SideBar from "../Components/Core/Dashboard/SlideBar";
import { Outlet } from "react-router-dom";


const DashBoard=()=>{
    const {loading:authLoading}=useSelector((state)=>state.auth)
    const {loading:profileLoadingLoading}=useSelector((state)=>state.profile)

    if(authLoading || profileLoadingLoading){
        return (
            <div className="mt-10">
                Loading....
            </div>
        )
    }

    return (
        <div className="relative flex min-h-[calc(100vh-3.5rem) text-white]">
            <SideBar/>
            <div className="h-[calc(100vh-3.5rem) overflow-auto]">
                <div className="mx-auto w-11/12 max-w-[1000px]">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;