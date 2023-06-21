import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from 'react-stars'
import {AiFillStar} from "react-icons/ai"
import {BsStar} from "react-icons/bs"
import {RiDeleteBin5Line} from "react-icons/ri"
import {removeFromCart} from "../../../../Slices/CartSlice"

const RenderCartCourse=()=>{
    const dispatch=useDispatch();
    const {cart}=useSelector((state)=>state.cart)
    return (
        <div className="text-white">
            {
                cart.map((course,index)=>(
                    <div>
                        <div>
                            <img src={course?.thumbnail}/>
                            <div>
                                <p>{course?.courseName}</p>
                                <p>{course?.category?.name}</p>
                                <div>
                                    <span>4.8</span>
                                    <ReactStars 
                                        count={5}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={<BsStar/>}
                                        fullIcon={<AiFillStar/>}
                                    />
                                    <span>{course?.ratingAndReview?.lenght} Ratings</span>
                                </div>
                            </div>
                            <div>
                                <button onClick={()=>dispatch(removeFromCart(course._id))}>
                                    <RiDeleteBin5Line/>
                                    <span>Remove</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartCourse;