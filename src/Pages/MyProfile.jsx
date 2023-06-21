import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import IconButton from "../Components/Common/IconButton";
import Button from ".././Components/Core/HomePage/Button"

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();
    const dispatch=useDispatch();

 return (
     <div className='mx-auto w-11/12 max-w-[1000px]  py-10 -z-1 '>

        <h1 className="mb-14 text-3xl font-semibold  text-richblack-5 ">
            My Profile
        </h1>
        
        {/* section 1 */}
        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 w-[55.125rem]">
            <div className="flex items-center gap-x-4">
                <img 
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className='aspect-square w-[78px] rounded-full object-cover' />
                <div>
                    <p className="text-lg font-semibold text-richblack-5"> {user?.firstName + " " + user?.lastName} </p>
                    <p className="text-sm text-richblack-300"> {user?.email}</p>
                </div>
            </div>

            <Button active={true} linkto={"/dashboard/settings"} textColor={"richblack-900"} icon={"LuEdit"}>Edit</Button>
            
        </div>

        {/* section 2 */}
        <div className="flex flex-col rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 w-[55.125rem] mt-10">
            <div className="flex items-center justify-between  gap-x-4">
                <p className="text-lg font-semibold text-richblack-5">About</p>
                <Button active={true} linkto={"/dashboard/settings"} textColor={"richblack-900"} icon={"LuEdit"}>Edit</Button>
            </div>
            <p className="text-sm text-richblack-300"> {user?.additionalDetails?.about  ??  "Write Something about Yourself"}</p>
        </div>

        {/* section 3 */}
        <div className="flex flex-col rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 w-[55.125rem] mt-10">
            <div className="flex items-center justify-between  gap-x-4">
                <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
                <Button active={true} linkto={"/dashboard/settings"} textColor={"richblack-900"} icon={"LuEdit"}>Edit</Button>
            </div>
            <div className="flex  gap-x-14    ">
                <div className="flex flex-col gap-y-5">
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">First Name</p>
                        <p className="text-sm font-md text-richblack-5">{user?.firstName}</p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">Email</p>
                        <p className="text-sm font-md text-richblack-5">{user?.email}</p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">Gender</p>
                        <p className="text-sm font-md text-richblack-5">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-y-5">
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                            <p className="text-sm font-md text-richblack-5">{user?.lastName}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                            <p className="text-sm font-md text-richblack-5">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Date of Birth</p>
                            <p className="text-sm font-md text-richblack-5">{user?.additionalDetails?.dateofBirth ?? "Add Date of Birth"}</p>
                        </div>
                </div>
                
            </div>
        </div>

      
    </div>
  )
}

export default MyProfile


