import React, { useState } from "react";
import {sidebarLinks} from "../../../data/dashboard-links";
import {logout} from "../../../Services/Operations/AuthAPI"
import { useDispatch, useSelector } from "react-redux";
import SideBarLink from "./SideBarLink";
import {VscSettingsGear} from "react-icons/vsc"
import { useNavigate } from "react-router-dom";
import {VscSignOut} from "react-icons/vsc"
import Modal from "../../Common/Modal"


const SideBar=()=>{

    const {loading:authLoading}=useSelector((state)=>state.auth)
    const {user,loading:profileLoadingLoading}=useSelector((state)=>state.profile)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [modal,setModal]=useState(null);


    if(authLoading || profileLoadingLoading){
        return (
            <div className="mt-10">
                Loading....
            </div>
        )
    }

    return (
        <div>
            <div className="flex flex-col lg:min-w-[222px] border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem) bg-richblack-800 py-10">
                <div className="flex flex-col">
                    {
                        sidebarLinks.map((element)=>{
                            if(element.type && user?.accountType!==element.type) return null;

                            return (
                                    <SideBarLink
                                    key={element.id} 
                                    link={element} iconName={element.icon}/>
                                )
                        })
                    }
                </div>

                <div className="w-11/12 mx-auto mt-6 mb-6 h-[1px] bg-richblack-600"></div>

                <div className="flex flex-col">
                    <SideBarLink 
                        link={{name:"Settings",path:"dashboard/settings"}
                        }
                        iconName={VscSettingsGear}
                />

                    <button onClick={()=>
                        setModal({text1:"Are You Sure ?",
                        text2:"You Will be Logged Out Of Our Account",
                        btn1Text:"Logout",
                        btn2Text:"Cancel",
                        btn1Handler:()=>dispatch(logout(navigate)),
                        btn2Handler:()=>setModal(null)
                    })}
                    className="text-sm font-medium text-richblack-300">

                    <div className="flex items-center gap-x-2">
                        <VscSignOut className="text-lg"/>
                        <span>Logout</span>
                    </div>

                    </button>
                </div>

            </div>
            {modal && <Modal modalData={modal}/>}
        </div>
    )
}

export default SideBar;