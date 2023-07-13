import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { COURSE_STATUS } from "../../../../../Util/Contants";
import {AiOutlineClockCircle} from "react-icons/ai"
import {AiFillCheckCircle} from "react-icons/ai"
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import {MdModeEditOutline} from "react-icons/md"
import {RiDeleteBin6Line} from "react-icons/ri";
import Modal from "../../../../Common/Modal";
import { deleteCourse, fetchInstructorCourses } from "../../../../../Services/Operations/CourseAPI";
import { useNavigate } from "react-router-dom";
import {formattedDate} from "../../../../../Util/DateFormatter"
const TRUNCATE_LENGTH = 30


export default function CourseTable({courses,setCourses}){

    const {token}=useSelector((state)=>state.auth);
    const [loading,setLoading]=useState(false);
    const [confirmationModal,setConfirmationModal]=useState(null);
    const dispatch=useDispatch();
    const navigate=useNavigate()

    const handleDeleteCourse=async(courseId)=>{
        setLoading(true);

        await deleteCourse({courseId},token);
        const result=await fetchInstructorCourses(token);
        if(result){
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    }

    return(
        <div className="lg:mt-12">
            <Table className="rounded-xl border border-richblack-800 ">
                <Thead>
                    <Tr className="flex lg:flex-row justify-between gap-x-10 px-6 py-2 items-center text-sm font-medium text-richblack-100 uppercase rounded-t-md border-b border-richblack-800">
                        <Th className="flex-1 text-left">Courses</Th>
                        <Th>Duration</Th>
                        <Th>Price</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        courses.length===0 ? (
                            <Tr className="py-10 text-center text-2xl font-medium text-richblack-100">
                                <Td>No Courses Found</Td>
                            </Tr>
                        ):(
                            courses?.map((course)=>(
                                <Tr key={course._id} className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">
                                    <Td className="flex flex-1 gap-x-4">
                                        <img src={course?.thumbnail}
                                        alt={course?.courseName}
                                        className="h-[150px] w-[220px] rounded-lg object-cover"/>
                                        <div className="flex flex-col justify-between ">
                                            <p className="text-lg font-semibold text-richblack-5 ">{course?.courseName}</p>
                                            <p className="text-sm text-richblack-300">
                                                {
                                                    course?.courseDescription.split(" ").length>TRUNCATE_LENGTH ? course.courseDescription.split(" ").slice(0,TRUNCATE_LENGTH).join(" ")+ "..." :
                                                    course?.courseDescription
                                                }
                                            </p> 
                                            <p className="text-[12px] text-white">
                                                Created At: {formattedDate(course.createdAt)}
                                            </p>
                                            {
                                                course.status===COURSE_STATUS.DRAFT ? 
                                                (<div className="flex lg:flex-row rounded-full w-fit items-center gap-2 bg-richblack-700 px-2 py-[2px] text-[0.75rem] font-medium text-pink-100">
                                                    <AiOutlineClockCircle size={14}/>
                                                    Drafted
                                                </div>):(
                                                    <div className="flex lg:flex-row rounded-full w-fit items-center gap-2 bg-richblack-700 px-2 py-[2px] text-[0.75rem] font-medium text-yellow-100">
                                                        <AiFillCheckCircle size={8}/>
                                                        Published
                                                    </div>
                                                ) 
                                            }
                                        </div>
                                    </Td>
                                    <Td>
                                        2hr 30min
                                    </Td>
                                    <Td>
                                            <div className="flex items-center gap-x-[0.1rem]">
                                                <HiOutlineCurrencyRupee/>
                                                {course?.price}
                                            </div>
                                    </Td>
                                    <Td>
                                        <div className="flex lg:flex-row gap-x-2 justify-between">
                                            <button disabled={loading} onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)}>
                                                <MdModeEditOutline className="text-xl "/>
                                            </button>
                                            <button disabled={loading} onClick={()=>setConfirmationModal({
                                                text1:"Do You Want To Delete This Course",
                                                text2:"All the data related to this course will be deleted",
                                                btn1Text:"Delete",
                                                btn2Text:"Cancel",
                                                btn1Handler:()=>handleDeleteCourse(course._id),
                                                btn2Handler:()=>setConfirmationModal(null),
                                            })}>
                                                <RiDeleteBin6Line className="text-xl"/>
                                            </button>
                                        </div>
                                    </Td>

                                </Tr>
                            ))
                        )
                    }
                </Tbody>
            </Table>
            {confirmationModal && <Modal modalData={confirmationModal}/>}
        </div>
    )

}