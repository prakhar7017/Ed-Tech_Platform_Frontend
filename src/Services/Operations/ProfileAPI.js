import {toast} from "react-hot-toast"
import {apiConnector} from "../ApiConnector";
import {profileEndpoints}  from "../Apis"
import {logout} from "./AuthAPI"
import {setLoading,setUser} from "../../Slices/profileSlice";


const {GET_USER_DETAILS_API,GET_USER_ENROLLED_COURSES_API,GET_INSTRUCTOR_DATA_API} = profileEndpoints


export async function getUserEnrolledCourse(token){
    const toastId=toast.loading("Loading");
    let result=[];
    try {
        const response=await apiConnector("GET",GET_USER_ENROLLED_COURSES_API,null,null,{Authorization: `Bearer ${token}`})

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result=response.data
    }catch(error){
        console.log(error);
        toast.error("Oppss...!! cannot get it ")
    }
    toast.dismiss(toastId)
    return result;
}

export async function getInstructorData(token){
    const toastId=toast.loading("Loading");
    let result=[];
    try {
        const response=await apiConnector("GET",GET_INSTRUCTOR_DATA_API,null,null,{Authorization: `Bearer ${token}`})

        console.log("instrutor Api",response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result=response.data.data
    }catch(error){
        console.log(error);
        toast.error("Oppss...!! cannot get it ")
    }
    toast.dismiss(toastId)
    return result;
}

