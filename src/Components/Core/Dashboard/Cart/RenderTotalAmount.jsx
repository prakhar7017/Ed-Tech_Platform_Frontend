import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../../Common/IconButton"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buyCourse } from "../../../../Services/Operations/StudentFeatureAPI";

const RenderTotalAmount=()=>{
    const {total,cart}=useSelector((state)=>state.cart);
    const {user}=useSelector((state)=>state.profile)
    const {token}=useSelector((state)=>state.auth)
    const navigate=useNavigate();
    const dispatch=useDispatch();

        const handleonClick=()=>{
            console.log("hello")
        const courses=cart.map((course)=>course._id);
        buyCourse(token,courses,user,navigate,dispatch)
    }
    return (
        <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <div>
                <div>
                    <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
                    <span className="mb-6 text-3xl font-medium text-yellow-100">Rs. {total}</span>
                </div>
                <IconButton
                    text={"Buy Now"}
                    onclick={handleonClick}
                    customeClasses={"w-full justify-center"}

                />
            </div>
        </div>
    )
}

export default RenderTotalAmount;