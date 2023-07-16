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
import {formatDate} from "../Util/FormateDate";
import CourseCardDetails from "../Components/Core/Course/CourseDetailsCard";
import {CiGlobe} from "react-icons/ci";
import Footer from "../Components/Common/Footer";
import Accordian from "../Components/Common/Accordian";
import { BiInfoCircle } from "react-icons/bi"


export default function CourseDetails(){
    const {courseId}=useParams();
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const {loading}=useSelector((state)=>state.profile);
    const {paymentLoading}=useSelector((state=>state.course));
    const [totalLecture,setTotalLecture]=useState(0);
    const [courseData,setCourseData]=useState();
    const [avgReviewCount,setAvgReviewCount]=useState(0);
    const [isActive,setActive]=useState([]);
    const [confirmationModal,setConfirmationModal]=useState(null);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handelisActive=(id)=>{
        setActive(!isActive.includes(id) ? isActive.concat([id]) : isActive.filter((element)=>element!=id))
    }

    useEffect(()=>{
        const getCourseData=async ()=>{
            try {
                const result=await fetchCourseDetails(courseId);
                setCourseData(result);
            } catch (error) {
                console.log("Could not fetch course Details")
            }
        }
        getCourseData();
    },[courseId])


    useEffect(()=>{
        const getAvgRating=async()=>{
            const count=await GetAvgRating(ratingAndReviews)
            setAvgReviewCount(count);
        }
        getAvgRating();
    },[courseData]);

    useEffect(()=>{
        const getTotalLectures=async()=>{
            let lectures=0;
            courseData?.data?.courseDetails?.courseContent?.forEach((section)=>{
                lectures+= section.subSection.length || 0
            })
            setTotalLecture(lectures);
        }
        getTotalLectures();
    },[courseData]);

    if (paymentLoading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        )
      }

    if(loading || !courseData){
        return(
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }

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
        category,courseContent,instructions,instructor,courseDescription,courseName,price,ratingAndReviews,status,studentEnrolled,tags,thumbnail,whatYouWillLearn,createdAt=null}=courseData?.data?.courseDetails;


     return (
        <div className="text-richblack-5">
            <div className="relative bg-richblack-800 w-full">
                <div className="mx-auto flex flex-col min-h-[28.125rem] py-8 pl-4 lg:mx-0 lg:justify-center lg:gap-y-6 lg:py-0 xl:max-w-[50.625rem]">
                    <p className="text-4xl font-bold text-richblack-5 sm:text-[2.625rem]">{courseName}</p>
                    <p className={`text-richblack-200`}>{courseDescription}</p>
                    <div className="text-md flex lg:flex-col flex-wrap  gap-2 text-lg">
                       <div className="flex items-center gap-x-4">
                            <span className="text-yellow-25">{avgReviewCount}</span>
                            <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
                            <span>{`(${ratingAndReviews.length} reviews)`}</span>
                            <span>{`${studentEnrolled.length} students enrolled`}</span>
                       </div>
                        <div>
                            <p>{`Created By ${instructor.firstName} ${instructor.lastName}`}</p>
                        </div>
                    </div>
                    <div className="text-md flex lg:flex-row flex-wrap  gap-2 text-lg">
                            <div className="flex gap-x-2 items-center"> 
                                <BiInfoCircle />   
                                <p>Created at {`${formatDate(createdAt)}`}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <CiGlobe/>
                                English
                            </div>
                     </div>
                </div>
                <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                    <CourseCardDetails course={courseData?.data?.courseDetails} handleBuyCourse={handleBuyCourse} setConfirmationModal={setConfirmationModal}/>
                </div>
            </div>

            <div className="flex lg:flex-col mx-auto lg:w-[78.75rem]  px-4 text-start text-richblack-5">
                <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[50.625rem] border border-richblack-600 p-8 my-8 flex flex-col justify-between gap-y-4 ">
                    <p className="text-[2rem] font-bold  ">What you'll learn</p>
                    <p className="text-[1.5rem] font-medium ">{`${whatYouWillLearn}`}</p>
                </div>

                <div className="flex flex-col justify-between gap-3 w-[51.875rem] text-richblack-5 ">
                    <p className="text-[1.75rem] font-bold">Course Content</p>
                    <div className="flex lg:flex flex-wrap gap-2 justify-between items-center">
                        <div className="flex gap-2">
                            <span>{`${courseContent.length} section(s)`}</span>
                            <span>{`${totalLecture} lecture(s)`}</span>
                            <span>{`${courseData?.data?.totalDuration}s total length`}</span>
                        </div>
                        <div>
                            <button onClick={()=>setActive([])} className="text-yellow-25">
                                Collapse all sections
                            </button>
                        </div>
                    </div>
                    <div className="py-4 max-h-max ">
                            {
                                courseContent?.map((course,index)=>(
                                    <Accordian key={index} course={course} isActive={isActive} handelisActive={handelisActive}/>
                                ))
                            }
                    </div>

                </div>

                <div className="mb-12 py-4">
                    <p  className="text-[28px] font-semibold">Author</p>
                    <div  className="flex items-center gap-4 py-4">
                        <img src={instructor.image}  alt="author" className="h-14 w-14 rounded-full object-cover"/>
                        <p className="text-lg">{`${instructor.firstName}`} {`${instructor.lastName}`}</p>
                    </div>
                    <p className="text-richblack-50">{instructor?.additionalDetails?.about}</p>
                </div>
            </div>
            <Footer/>
            {
                confirmationModal && <Modal modalData={confirmationModal}/>
            }
        </div>
     )
}