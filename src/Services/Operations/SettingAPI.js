import {toast} from "react-hot-toast"

import {setUser} from "../../Slices/profileSlice"

import {apiConnector} from "../ApiConnector";

import { settingsEndpoints } from "../Apis";

import {logout} from "./AuthAPI"

const {UPDATE_DISPLAY_PICTURE_API,UPDATE_PROFILE_API,CHANGE_PASSWORD_API,DELETE_PROFILE_API}=settingsEndpoints;


export function updateDisplayPicture(token,formData){
    console.log(formData);
    return async (dispatch)=>{
        const toasId=toast.loading("Loading..")
        try {
            const response=await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,formData,null,{
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${token}`,
            })
            console.log(response.data)
            if(!response.data.success){
                throw Error(response.data.message)
            }
            // const userimage=response.data.updateProfile.image ? response.data.updateProfile.image :`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updateProfile.firstName} ${response.data.updateProfile.lastName}`
            dispatch(setUser({...response.data.updateProfile}))
            localStorage.setItem("user",JSON.stringify(response.data.updateProfile))
            toast.success("Success! Profile Picture Changed SuccessFully");
        } catch (error) {
            console.log(error);
            toast.error("We're sorry, but it seems like an error has occurred. Hang tight while we resolve it")
        }
        toast.dismiss(toasId)
    }
}

export function updateProfile(token,formData){
    return async (dispatch)=>{
        const toastId=toast.loading("Loading..");
        try {
            const response=await apiConnector("PUT",UPDATE_PROFILE_API,formData,null,{
                Authorization: `Bearer ${token}`
            })

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            dispatch(setUser({...response.data.updatedProfile}))
            localStorage.setItem("user",JSON.stringify({...response.data.updatedProfile}))
            toast.success("Yupii....!! Saved Succesfully")
        } catch (error) {
            console.log(error);
            toast.error("Oppss..!! Something Went Wrong")
        }
        toast.dismiss(toastId);
    }
}

export function UpdatePassword(token,formData){
    return async (dispatch)=>{
        const toastId=toast.loading("Loading..");
        try {
            const response=await apiConnector("POST",CHANGE_PASSWORD_API,formData,null,{
                Authorization: `Bearer ${token}`
            })
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Yupii..!! Updated Successfully")
        } catch (error) {
            console.log(error)
            toast.error("Oppss..!! Something Went wrong")
        }

        toast.dismiss(toastId);
    }

}

export function deleteAccount(token,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        try {
            const response=await apiConnector("DELETE",DELETE_PROFILE_API,null,null,{
                Authorization: `Bearer ${token}`
            })
            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Yepii..!!Deleted Successfully")
            dispatch(logout(navigate))
        } catch (error) {
            console.log(error)
            toast.error("Oppss..!! Something went Wrong")
        }
        toast.dismiss(toastId);
    }
}