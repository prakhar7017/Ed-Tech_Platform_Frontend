import { toast } from "react-hot-toast";
import {studentEndpoints} from "../Apis";
import { apiConnector } from "../ApiConnector";
// import rzpLogo from "../../assets/Logo/"
import {setPaymentLoading} from "../../Slices/courseSlice";
import {resetCart} from "../../Slices/CartSlice"
const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API} =studentEndpoints;

function loadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement("script");
        script.src=src;

        script.onload=()=>{
            resolve(true);
        }

        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastId=toast.loading("loading...");
    try {
        //load the script
        const result=await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if(!result){
            toast.error("Opps... Cannot load Payment Gateway");
            return;
        }
        //initate the order
        const orderResponse=await apiConnector("POST",COURSE_PAYMENT_API,{courses},null,{
            Authorization: `Bearer ${token}`,
          })

        if(!orderResponse){
            throw new Error(orderResponse.data.message);
        }

        //options
        const option={
            key:process.env.RAZORPAY_KEY,
            currency:orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description:"Thank You For Purchasing The Course",
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler:function(response){
                //send successful email 
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token);
                //verify payment
                verifyPayment({...response,courses},token,navigate,dispatch)
            },
        }

    } catch (error) {
        console.log(error);
        toast.error("Could Not Make Payment")
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response,amount,token){
    try {
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount
        },null,{
            Authorization: `Bearer ${token}`
        })
    } catch (error) {
        console.log("Payment Success error", error);
    }
}

async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId=toast.loading("Verifying Payment");
    dispatch(setPaymentLoading(true));
    try {
        const response=await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Payment SuccessFull..!Happy Learning");
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart());
    } catch (error) {
        console.log("Payment verified")
        toast.error("Could Not Complete The Payment")
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}