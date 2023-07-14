import { useState } from "react"
import { buyCourse } from "../Services/Operations/StudentFeatureAPI"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function CourseDetails(){
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const {courseId}=useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleBuyCourse=()=>{
         if(token){
            buyCourse(token,[courseId],user,navigate,dispatch);
            return;
         }
    }
     return (
        <div className="flex items-center">
            <button className="bg-yellow-25 p-6 mt-10" onClick={()=>handleBuyCourse}>
                Buy now 
            </button>
        </div>
     )
}