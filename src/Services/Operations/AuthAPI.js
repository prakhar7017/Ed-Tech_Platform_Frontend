import {toast} from "react-hot-toast"

import {setLoading,setToken} from "../../Slices/authSlice";

import { resetCart } from "../../Slices/CartSlice";

import {setUser} from "../../Slices/profileSlice"

import {apiConnector} from "../ApiConnector";

import { endpoints } from "../Apis";

const {SENDOTP_API,SIGNUP_API,LOGIN_API,RESETPASSTOKEN_API,RESETPASSWORD_API,}=endpoints

export const sendOtp=(email,navigate)=>{
    return async (dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response=await apiConnector("POST",SENDOTP_API,{email,checkUserPresent:true})
            console.log(response.data.success)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Yupii !! OTP Sent Successfully")
            navigate("/verify-email")
        } catch (error) {
            console.log(error);
            toast.error("Oppsss !! Could Not Send OTP ")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId);
    }
}

export const signup =(accountType,firstName,lastName,email,password,confirmPassword,Otp,navigate)=>{
    return async (dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response=await apiConnector("POST",SIGNUP_API,{
                accountType,firstName,lastName,email,password,confirmPassword,Otp
            })

            console.log(response.data.success)

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Yupiii !! Signup Successfully")
            navigate("/login")
        } catch (error) {
            console.log(error)
            toast.error("Oppss !! Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }

}

export const login =(email,password,navigate)=>{
    return async (dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try {
            const response=await apiConnector("POST",LOGIN_API,{
                email,password
            })

            console.log(response.data.data);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Yupiii !! Login Successfull")
            dispatch(setToken(response.data.token));
            const userImage=response.data?.user?.image ?response.data.user.image :`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({...response.data.user,image:userImage}))
            localStorage.setItem("token",JSON.stringify(response.data.token))
            navigate("/dashboard/my-profile")
        } catch (error) {
            console.log(error)
            toast.error("Oppss !! login Failed")   
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const logout=(navigate)=>{
    return (dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null))
        dispatch(resetCart());
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out !! Come Back Soon")
        navigate("/")
    }
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", RESETPASSTOKEN_API, {
          email,
        })
  
        console.log("RESETPASSTOKEN RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Reset Email Sent")
        setEmailSent(true)
      } catch (error) {
        console.log("RESETPASSTOKEN ERROR............", error)
        toast.error("Failed To Send Reset Email")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }
  
  export function resetPassword(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", RESETPASSWORD_API, {
          password,
          confirmPassword,
          token,
        })
  
        console.log("RESETPASSWORD RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Password Reset Successfully")
        navigate("/login")
      } catch (error) {
        console.log("RESETPASSWORD ERROR............", error)
        toast.error("Failed To Reset Password")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }