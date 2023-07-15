import { useState } from "react"
import { buyCourse } from "../Services/Operations/StudentFeatureAPI"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchCourseDetails} from "../Services/Operations/CourseAPI"
import { useEffect } from "react";
import GetAvgRating from "../Util/AvgRating";
import Error from "../Pages/Error";
import Modal from "../Components/Common/Modal";
import RatingStars from "../Components/Common/RatingStar";


export default function CourseDetails(){
    const {courseId}=useParams();
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const {loading}=useSelector((state)=>state.profile);
    const {paymentLoading}=useSelector((state=>state.course));
    const [totalLecture,setTotalLecture]=useState(0);
    const [courseData,setCourseData]=useState();
    const [avgReviewCount,setAvgReviewCount]=useState(0);
    const [confirmationModal,setConfirmationModal]=useState(null);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>{
        const getCourseData=async ()=>{
            try {
                const result=await fetchCourseDetails(courseId);
                console.log(result);
                setCourseData(result);
            } catch (error) {
                console.log("Could not fetch course Details")
            }
        }
        getCourseData();
    },[courseId])

    useEffect(()=>{
        console.log(courseData);
        const getAvgRating=async()=>{
            const count=await GetAvgRating(courseData?.data?.data?.CourseDetails?.ratingAndReviews)
            setAvgReviewCount(count);
        }
        getAvgRating();
    },[courseData]);

    useEffect(()=>{
        const getTotalLectures=async()=>{
            let lectures=0;
            courseData?.data?.data?.CourseDetails?.courseContent?.forEach((section)=>{
                lectures+= section.subSection.length || 0
            })
            setTotalLecture(totalLecture);
        }
        getTotalLectures();
    },[courseData]);

    // if(!courseData){
    //     return(
    //         <div>
    //             Loading...
    //         </div>
    //     )
    // }

    if(!courseData?.success){
        return (
            <div>
                <Error/>
            </div>
        )
    }

    const handleBuyCourse=()=>{
         if(token){
            buyCourse(token,[courseId],user,navigate,dispatch);
            return;
         }
         setConfirmationModal({
            text1:"You Are Not Logged In",
            text2:"Please Log in to Purchase the course",
            btn1Text:"Log in",
            btn2Text:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null),
         })
    }

    const {
        category,courseContent,instructions,instructor,courseDescription,courseName,price,ratingAndReviews,status,studentEnrolled,tags,thumbnail,whatYouWillLearn}=courseData?.data?.courseDetails;
     return (
        <div className="flex lg:flex-col items-center text-white">
            <div>
                <div>
                    <p>{courseName}</p>
                    <p>{courseDescription}</p>
                    <div>
                        <span>{avgReviewCount}</span>
                        <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
                        <span>{`(${ratingAndReviews.length} reviews)`}</span>
                        <span>{`${studentEnrolled} students enrolled`}</span>
                        <div>
                        <p>{`Created By ${instructor.firstName} ${instructor.lastName}`}</p>
                        </div>
                    </div>
                    <div>
                            <div>

                            </div>
                    </div>
                </div>
            </div>



            {/* <button className="bg-yellow-25 p-6 mt-10" onClick={handleBuyCourse}>
                Buy now 
            </button> */}


            {
                confirmationModal && <Modal modalData={confirmationModal}/>
            }
        </div>
     )
}