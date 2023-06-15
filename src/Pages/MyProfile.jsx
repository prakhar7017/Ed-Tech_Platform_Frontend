import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import IconButton from "../Components/Common/IconButton";

const MyProfile=()=>{

    const {user}=useSelector((state)=>state.profile)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    return (
        <div>
            <h1>My Profile</h1>

            {/* section 1  */}
            <div>
                <div>
                    <img src={`${user?.image}`} alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[78px] rounded-full object-cover"
                    />
                    <div>
                        <p>{user?.firstName + " " + user?.lastName}</p>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <IconButton 
                    text="Edit"
                    Onclick={()=>{
                        navigate("/dashboard/settings")
                    }}
                />
                <IconButton 
                    text="Edit"
                    Onclick={()=>{
                        navigate("/dashboard/settings")
                    }}
                />
            </div>

        </div>
    )
}

export default MyProfile;