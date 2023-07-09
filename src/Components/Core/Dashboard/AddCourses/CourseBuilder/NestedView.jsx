import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {RxDropdownMenu} from "react-icons/rx"
import {MdModeEditOutline} from "react-icons/md"
import {RiDeleteBin6Line} from "react-icons/ri";
import {AiFillCaretDown} from "react-icons/ai";
import {IoMdAdd} from "react-icons/io";
import SubSectionModal from "./SubSectionModal";
import Modal from "../../../../Common/Modal"
import { deleteSection, deleteSubSection } from "../../../../../Services/Operations/CourseAPI";
import {setEditCourse,setStep,setCourse} from "../../../../../Slices/courseSlice"

export default function NestedViewComponent({handleChangeEditSection}){
    const dispatch=useDispatch();

    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);

    const [addSubSection,setAddSubSection]=useState(null);
    const [viewSubSection,setViewSubSection]=useState(null);
    const [editSubSection,setEditSubSection]=useState(null);

    const [modal,setModal]=useState(null);

    const handleDeleteSection=async (sectionId)=>{
        const result=await deleteSection({
            sectionId,
            courseId:course._id,
        },token)
        if(result){
            dispatch(setCourse(result));
        }
        setModal(null);

    }

    const handleDeleteSubSection=async (subSectionId,sectionId)=>{
        const result=await deleteSubSection({
            subSectionId,
            sectionId,
        },token)
        if(result){
            const updatedCourseContent=course?.courseContent?.map((section)=>section._id===sectionId ? result :section)
            const updatedCourse={...course,courseContent:updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setModal(null);
    }

    return (
        <div>
            <div cclassName="rounded-lg bg-richblack-700 p-6 px-8"> 
                {course?.courseContent?.map((section)=>(
                     <details key={section._id} open> 
                        <summery className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                            <div className="flex items-center gap-x-3">
                                <RxDropdownMenu className="text-2xl text-richblack-50"/>
                                <p className="font-semibold text-richblack-50">{section.sectionName}</p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <button onClick={()=>handleChangeEditSection(section._id,section.sectionName)}>
                                    <MdModeEditOutline className="text-xl text-richblack-300" />
                                </button>
                                <button onClick={()=>{
                                    setModal({
                                        text1:"Delete this Section",
                                        text2:"All the lectures in this section will be deleted",
                                        btn1Text:"Delete",
                                        btn2Text:"Cancel",
                                        btn1Handler:()=>handleDeleteSection(section._id),
                                        btn2Handler:()=>setModal(null),
                                    })
                                }}>
                                    <RiDeleteBin6Line className="text-xl text-richblack-300"/>
                                </button>
                                <span className="font-medium text-richblack-300">|</span>
                                <AiFillCaretDown className={`text-xl text-richblack-300`}/>
                            </div>
                        </summery>
                        <div className="px-6 pb-4">
                            {
                                section?.subSection?.map((data)=>(
                                   <div key={data?._id} onClick={()=>setViewSubSection(data)} className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2">
                                        <div className="flex items-center gap-x-3 py-2">
                                            <RxDropdownMenu className="text-2xl text-richblack-50" />
                                            <p className="font-semibold text-richblack-50">{data?.title}</p>
                                        </div>
                                        <div className="flex items-center gap-x-3"
                                        onClick={(e)=>e.stopPropagation()}>
                                            <button onClick={()=>setEditSubSection({...data,sectionId:section._id})}> 
                                                <MdModeEditOutline className="text-xl text-richblack-300"/>
                                            </button>
                                            <button onClick={()=>setModal({
                                                text1:"Delete this Sub Section",
                                                text2:"Selected Lecture  will be deleted",
                                                btn1Text:"Delete",
                                                btn2Text:"Cancel",
                                                btn1Handler:()=>handleDeleteSubSection(data._id,section._id),
                                                btn2Handler:()=>setModal(null),
                                            })}>
                                                <RiDeleteBin6Line className="text-xl text-richblack-300"/>
                                            </button>
                                        </div>
                                   </div> 
                                ))
                            }
                            <button className="mt-3 flex items-center gap-x-1 text-yellow-50" 
                                onClick={()=>setAddSubSection(section._id)}>
                                <IoMdAdd className="text-yellow-50 text-lg"/>
                                <p>Add Lecture</p>
                            </button>
                        </div>
                     </details> 
                ))}
            </div>
            {
                addSubSection ? (<SubSectionModal 
                    modalData={addSubSection}
                    setModalData={setAddSubSection}
                    add={true}
                />) 
                :viewSubSection ? (<SubSectionModal
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    view={true}
                />) 
                :editSubSection ? (<SubSectionModal
                    modalData={editSubSection}
                    setModalData={setEditSubSection}
                    edit={true}
                />)
                : (<div></div>)
            }
              
            {
                    modal ? (<Modal modalData={modal}/>) : (<div></div>)
            }
        </div>
    )
}