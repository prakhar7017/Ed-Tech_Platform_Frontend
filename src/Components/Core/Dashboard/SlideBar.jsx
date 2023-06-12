import React from "react";
import {sidebarLinks} from "../../../data/dashboard-links";
import {logout} from "../../../Services/Operations/AuthAPIs"
import { useSelector } from "react-redux";
import SideBarLink from "./SideBarLink";
import {VscSettingsGear} from "react-icons/vsc"


const SideBar=()=>{
    const {user,loading:profileLoading}=useSelector((state)=>state.profile);
    const {loading:authLoading}=useSelector((state)=>state.auth);

    if(profileLoading || authLoading){
        return (
            <div className="mt-10">Loading....</div>
        )
    }
    return (
        <div>
            <div className="flex flex-col lg:min-w-[222px] border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem) bg-richblack-800 py-10">
                <div className="flex flex-col">
                    {
                        sidebarLinks.map((element)=>{
                            if(element.type && user?.accountType!==element.type){
                                <SideBarLink
                                key={element.id} 
                                link={element} iconName={element.icon}/>
                            }
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

                    <button onClick={()=>{
                        title:"Are You Sure ?",
                        description:"You Will be Logged Out Of Our Account",
                        btn1Texr:"Logout",
                        btn2Text:"Cancel",
                        btn1Handler:()=>dispatch(logout(navigate)),
                        btn2Handler:dis
                        
                        
                    }}></button>
                </div>

            </div>
        </div>
    )
}

export default SideBar;