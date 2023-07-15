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
        !isActive.includes(id) ? isActive.push(id) : isActive.filter((element)=>element!=id)
    }

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
        _id,category,courseContent,instructions,instructor,courseDescription,courseName,price,ratingAndReviews,status,studentEnrolled,tags,thumbnail,whatYouWillLearn,createdAt=null}=courseData?.data?.courseDetails;

     return (
        <div className="text-white">
            <div className="relative bg-richblack-800 w-full">
                <div className="mx-auto flex flex-col min-h-[450px] py-8 pl-4 lg:mx-0 lg:justify-center lg:gap-y-6 lg:py-0 xl:max-w-[810px]">
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

            <div>
                <div>
                    <p>What you'll learn</p>
                    <p>{`${whatYouWillLearn}`}</p>
                </div>

                <div>
                    <p>Course Content</p>
                    <div>
                        <div>
                            <span>{`${courseContent.length} section(s)`}</span>
                            <span>{`${totalLecture} lecture(s)`}</span>
                            <span>{`${courseData?.data?.totalDuration}s total length`}</span>
                        </div>
                        <div>
                            <button onClick={()=>setActive([])}>
                                Collapse all sections
                            </button>
                        </div>
                    </div>
                    <div>
                        <Accordian id={_id} sections={courseContent} isActive={isActive} handelisActive={handelisActive}/>
                    </div>

                </div>

                <div>
                    <p>Author</p>
                    <div>
                        <img src={user.image} height={50} width={50}/>
                        <p>{`${instructor.firstName}`} {`${instructor.lastName}`}</p>
                    </div>
                    <p>Developer</p>
                </div>
            </div>



            {/* <button className="bg-yellow-25 p-6 mt-10" onClick={handleBuyCourse}>
                Buy now 
            </button> */}

            <Footer/>
            {
                confirmationModal && <Modal modalData={confirmationModal}/>
            }
        </div>
     )
}