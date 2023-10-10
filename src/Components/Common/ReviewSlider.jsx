import {Swiper,SwiperSlide} from "swiper/react"
import {AiFillStar} from "react-icons/ai"
import {BsStar} from "react-icons/bs"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {Autoplay,FreeMode,Navigation,Pagination} from "swiper/modules"
import ReactStars from "react-rating-stars-component"
import { useState } from "react"
import { useEffect } from "react"
import {ratingsEndpoints} from "../../Services/Apis"
import { apiConnector } from "../../Services/ApiConnector"
export default function ReviewSlider(){

    const [reviews,setReviews]=useState([]);
    const TRUNCATE=30;
    
    useEffect(()=>{
        const fetchAllReviews=async ()=>{
            const result=await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API,null,null,null);

            if(result?.data?.success){
                setReviews(result?.data?.allRatingAndReview);
            }
        }
        fetchAllReviews();
    },[])

    return(
        <div className="text-white">
            <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={25}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay:2500,
                        disableOnInteraction: false,
                    }}
                    modules={[FreeMode,Pagination,Autoplay]}
                >
                    {
                        reviews?.map((review,index)=>(
                            <SwiperSlide key={index}>
                                <img
                                    src={review?.user?.image ? review?.user?.image : `https://api.dicebear.com/6.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}` }
                                    alt={`${review?.user?.firstName + review?.user?.lastName}`}
                                    className="h-9 w-9 rounded-full object-cover"
                                />
                                <p className="font-semibold text-richblack-5">{review?.user?.firstName}  {review?.user?.lastName}</p>
                                <p className="text-[12px] font-medium text-richblack-500">{review?.course?.courseName}</p>
                                <p className="font-medium text-richblack-25">
                                    {
                                        review?.review.split(" ").length > TRUNCATE
                                            ? `${review?.review
                                            .split(" ")
                                            .slice(0, TRUNCATE)
                                            .join(" ")} ...`
                                        : `${review?.review}`
                                    }
                                </p>
                                <p className="flex items-center gap-2 ">
                                    <span className="font-semibold text-yellow-100">
                                        {review?.rating.toFixed(1)}
                                    </span>
                                    <ReactStars
                                        count={5}
                                        value={review?.rating}
                                        size={20}
                                        edit={false}
                                        activeColor={"#ffd700"}
                                        emptyIcon={<BsStar/>}
                                        fullIcon={<AiFillStar/>}
                                    />
                                </p>

                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>
        </div>
    )
}