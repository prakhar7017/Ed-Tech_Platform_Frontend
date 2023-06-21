import React from "react";
import { useSelector } from "react-redux";
import IconButton from "../../../Common/IconButton"

const RenderTotalAmount=()=>{
    const {total,cart}=useSelector((state)=>state.cart);
    const handleonClick=()=>{
        const courses=cart.map((course)=>course._id);
        console.log(courses)
        // api integragtion to buy course
    }
    return (
        <div>
            <div>
                <div>
                    <p>Total:</p>
                    <span>Rs. {total}</span>
                </div>
                <IconButton
                    text={"Buy Now"}
                    onClick={handleonClick}
                    customeClasses={"w-full justify-center"}

                />
            </div>
        </div>
    )
}

export default RenderTotalAmount;