import React from "react"
import { useSelector } from "react-redux";
import RenderCartCourse from "./RenderCartCourse";
import RenderTotalAmount from "./RenderTotalAmount";


const Cart=()=>{
    const {total,totalItems} =useSelector((state)=>state.cart);
    const {paymentLoading}=useSelector((state)=>state.course);

    if(paymentLoading){
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div class="spinner">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
            </div>
        </div>
    }

    return (
        <div className="text-white">
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">Your Cart</h1>
            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">{totalItems} Courses in Cart</p>
            {total > 0 ? (
                <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                <RenderCartCourse/>
                <RenderTotalAmount/>

            </div>) : (<p className="mt-14 text-center text-3xl text-richblack-100">Your cart is empty</p>)}
        </div>
    )
}

export default Cart;