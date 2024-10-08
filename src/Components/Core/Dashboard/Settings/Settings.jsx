import React from "react";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditDetails from "./EditDetails";
import ChangePassword from "./UpdatePassword";
import DeleteUserAccount from "./DeleteAccount";

const Settings=()=>{
    return(
        <>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Profile</h1>
            <ChangeProfilePicture/>
            <EditDetails/>
            <ChangePassword/>
            <DeleteUserAccount/>
        </>
    )
}

export default Settings;