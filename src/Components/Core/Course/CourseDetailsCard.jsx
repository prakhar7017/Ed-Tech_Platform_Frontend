import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import {FaShareSquare} from "react-icons/fa"
import {AiFillCaretRight} from "react-icons/ai"
import copy from 'copy-to-clipboard';
import { toast } from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../../Util/Contants";
import {addToCart} from "../../../Slices/CartSlice";


export default function CourseCardDetails({setConfirmationModal,handleBuyCourse,course}){


    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handelAddToCart=()=>{
        if(user && user?.accountType===ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("Sorry,Instructor Cannot Buy A Course")
            return;
        }
        if(user && user?.accountType===ACCOUNT_TYPE.STUDENT && token){
            dispatch(addToCart(course))
            return;
        }

        setConfirmationModal({
            text1:"you are not logged in",
            text2:"Please login to add to cart",
            btn1text:"login",
            btn2Text:"cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler: ()=> setConfirmationModal(null),
        })
    }

    const handleShare=()=>{
        copy(window.location.href);
        toast.success("Link Copied to Clipboard")
    }

    return (
        <div className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}>
            <img src={course.thumbnail} className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full" />
            <div className="px-4">
                <p className="space-x-3 pb-4 text-3xl font-semibold">Rs. {`${course.price}`}</p>
                <div className="flex flex-col gap-4">
                    <button onClick={user && course?.studentEnrolled?.includes(user?._id) ? ()=>navigate("/dashboard/enrolled-courses"): handleBuyCourse}
                    className="rounded-lg bg-yellow-50 w-max-content text-richblack-800 font-semibold text-base text-center h-[2.5rem]">
                        {
                            user && course?.studentEnrolled?.includes(user?._id) ? "Go To Course" : "Buy Course"
                        }
                    </button>
                    <button>
                        {
                            (!course?.studentEnrolled.includes(user?._id))&& (
                                <button
                                onClick={handelAddToCart}
                                 className="rounded-lg bg-richblack-800 px-[12px] py-[8px] w-full text-richblack-5 font-semibold text-base text-center h-[2.5rem]">
                                    Add To Cart
                                </button>
                            )
                        }
                    </button>
                </div>
                <p className="pb-3 pt-6 text-center text-sm text-richblack-25">30-Day Money-Back Guarantee</p>

                <div>
                    <p className={`my-2 text-xl font-semibold `}>This Course Includes :</p>
                    {
                        course?.instructions?.map((instruct,index)=>(
                            <p className="flex flex-row items-center gap-3 text-sm text-caribbeangreen-100" key={index}>
                                <AiFillCaretRight/>
                                {`${instruct}`}
                            </p>
                        ))
                    }
                </div>

                <div className="text-center">
                    <button
                        onClick={handleShare} className="mx-auto flex items-center gap-2 py-6 text-yellow-100 ">
                        <FaShareSquare size={15}/>
                        Share
                    </button>
                </div>
            </div>
        </div>
    )

}