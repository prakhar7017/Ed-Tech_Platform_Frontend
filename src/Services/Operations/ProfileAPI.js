import {toast} from "react-hot-toast"
import {apiConnector} from "../ApiConnector";
import {profileEndpoints}  from "../Apis"
import {logout} from "./AuthAPI"
import {setLoading,setUser} from "../../Slices/profileSlice";


const {GET_USER_DETAILS_API,GET_USER_ENROLLED_COURSES_API,GET_INSTRUCTOR_DATA_API} = profileEndpoints


export default function getUserDetails(token,navigate){
    return async (dispatch)=>{
        const toastId=toast.loading("Loading");
        dispatch(setLoading(true));
        try {
            const response=await apiConnector("GET",GET_USER_DETAILS_API,null,null,{
                Authorization:`Bearer ${token}`
            })
            if(!response.data.success){
                throw Error(response.data.message)
            }

            const userImage=response?.data?.data?.image ? response?.data?.data?.image :`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
            dispatch(setUser({...response.data.data,image:userImage}))

        } catch (error) {
            dispatch(logout(navigate));
            toast.error("OPPS..! Logged OUT")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export async function getUserEnrolledCourse(token){
    const toastId=toast.loading("Loading");
    let result=[];
    try {
        const response=await apiConnector("GET",GET_USER_ENROLLED_COURSES_API,null,null,{Authorization: `Bearer ${token}`})
        console.log(response);
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

