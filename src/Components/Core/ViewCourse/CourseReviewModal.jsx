import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import ReactStars from "react-rating-stars-component";
import IconButton from "../../Common/IconButton";
import { createRating } from "../../../Services/Operations/CourseAPI";

export default function CourseReviewModal({setReviewModal}){

    const {user}=useSelector((state)=>state.profile)
    const {token}=useSelector((state)=>state.auth)
    const {courseEntireData}=useSelector((state)=>state.viewCourse)
    const {handleSubmit,register,setValue,getValues,formState:{errors}}=useForm();

    useEffect(()=>{
        setValue("courseExperience","");
        setValue("courseRating",0);
    },[]);

    const handleOnSubmit=async (data)=>{
        await createRating({
            courseId:courseEntireData._id,
            rating:data.courseRating,
            review:data.courseExperience,
        },token)
    }

    const ratingChanged=(newRating)=>{
        setValue("courseRating",newRating);

    }

    return (
        <div>
            <div>
                <div>
                    <p>Add Review</p>
                    <button onClick={()=>setReviewModal(false)}>
                        Close
                    </button>
                </div>
                <div>
                    <div>
                        <img src={user?.image} alt ={user.firstName}
                            className="aspect-square w-[50px] rounded-full object-cover"
                        />
                        <div>
                            <p>
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p>Posting Publicly</p>
                        </div>

                        <form
                        onSubmit={handleSubmit(handleOnSubmit())}>

                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                activeColor="#ffd700"
                            />

                            <div>
                                <label>
                                    <p>
                                        Add Your Experience
                                    </p>
                                    <textarea
                                        id="courseExperience"
                                        placeholder="Add Your Experience here"
                                        {...register("courseExperience",{required:true})}
                                    />
                                    {
                                        errors.courseExperience && (
                                            <span>
                                            Please add your experience
                                            </span>
                                        )
                                    }
                                </label>
                            </div>
                            <div>
                                <button onClick={()=>setReviewModal(false)}>
                                    Cancel
                                </button>
                                <IconButton
                                    type={"submit"}
                                    text={"Save"}
                                />
                            </div>
                        </form>                       
                    </div>
                </div>
            </div>
        </div>
    )
}