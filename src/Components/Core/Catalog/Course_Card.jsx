import { Link } from "react-router-dom";
import RatingStars from "../../Common/RatingStar"
import { useEffect, useState } from "react";
import GetAvgRating from "../../../Util/AvgRating";

export default function Course_Card({course,Height}){
    const [avgReviewCount,setAvgReviewCount]=useState(0);

    useEffect(()=>{
        const count= GetAvgRating(course?.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])
    return (
        <div>
            <Link to={`/courses/${course._id}`}>
                <div>
                    <div>
                        <img src={course?.thumbnail}
                        alt="Course Thumbnail"
                        className={`${Height} w-full rounded-xl object-cover`}></img>
                    </div>
                    <div className="flex gap-x-3">
                        <p>{course?.courseName}</p>
                        <p>{course?.instructor?.firstName}{" "}
                        {course?.instructor?.lastName}</p>
                        <div>
                            <span>{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount}/>
                            <span>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                        <p>{course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}