import {toast} from "react-hot-toast"

import {setLoading,setToken} from "../../Slices/authSlice";

import { resetCart } from "../../Slices/CartSlice";

import {setUser} from "../../Slices/profileSlice"

import {apiConnector} from "../ApiConnector";

import { endpoints } from "../Apis";

import {contactusEndpoint}  from "../Apis"

const {SENDOTP_API,SIGNUP_API,LOGIN_API,RESETPASSTOKEN_API,RESETPASSWORD_API,}=endpoints

export const sendOtp=(email,navigate)=>{
    return async (dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response=await apiConnector("POST",SENDOTP_API,{email,checkUserPresent:true})
            console.log(response.data)

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

export const signup =(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate)=>{
  console.log(`otp->`,otp);
    return async (dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response=await apiConnector("POST",SIGNUP_API,{
                accountType,firstName,lastName,email,password,confirmPassword,otp
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
            console.log(response.data.token);
            if(!response.data.success){
                throw new Error(response.data.message)
            }

            dispatch(setToken(response.data.token));
            localStorage.setItem("token",JSON.stringify(response.data.token))

            const userImage=response.data?.existUser?.image ? response.data.existUser.image :`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.existUser.firstName} ${response.data.existUser.lastName}`
            
            dispatch(setUser({...response.data.existUser,image:userImage}))
            localStorage.setItem("user",JSON.stringify(response.data.existUser));

            toast.success("Yupiii !! Login Successfull")
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

  export function Contactus(data){
    return async(dispatch)=>{
      const toastId=toast.loading("Please Wait")
      try {
        const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
        console.log(response)
        if(!response.data.success){
          throw new Error(response.data.message);
        }
        toast.success("We will contact you Shortly")
      } catch (error) {
        console.log("contactUs Error............", error)
        toast.error("Opps Failed to reach us")
      }
      toast.dismiss(toastId)
    }
  }