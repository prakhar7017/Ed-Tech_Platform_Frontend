import React from "react"
import { useSelector } from "react-redux";
import RenderCartCourse from "./RenderCartCourse";
import RenderTotalAmount from "./RenderTotalAmount";


const Cart=()=>{
    const {total,totalItems} =useSelector((state)=>state.cart);

    return (
        <div className="text-white">
            <h1>Your Cart</h1>
            <p>{totalItems} Courses in Cart</p>
            {total > 0 ? (<div>
                <RenderCartCourse/>
                <RenderTotalAmount/>

            </div>) : (<p>Your cart is empty</p>)}
        </div>
    )
}

export default Cart;