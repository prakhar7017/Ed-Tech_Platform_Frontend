import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {RxDropdownMenu} from "react-icons/rx"
import {MdModeEditOutline} from "react-icons/md"
import {RiDeleteBin6Line} from "react-icons/ri";
import {BiSolidDownArrow} from "react-icons/bi";
import {IoMdAdd} from "react-icons/io";
import SubSectionModal from "./SubSectionModal";
import Modal from "../../../../Common/Modal"

export default function NestedViewComponent({handleChangeEditSection}){
    const dispatch=useDispatch();

    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);

    const [addSubSection,setAddSubSection]=useState(null);
    const [viewSubSection,setViewSubSection]=useState(null);
    const [editSubSection,setEditSubSection]=useState(null);

    const [modal,setModal]=useState(null);
    console.log(course);

    const handleDeleteSection=(sectionId)=>{

    }
    return (
        <div>
            <div className="text-white mt-10 rounded-lg bg-richblack-700"> 
                {course?.courseContent?.map((section)=>(
                     <details key={section._id} open> 
                        <summery className="flex items-center justify-between gap-x-3 border-b-2">
                            <div className="flex items-center gap-x-3">
                                <RxDropdownMenu/>
                                <p>{section.sectionName}</p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <button onClick={handleChangeEditSection(section._id,section.sectionName)}>
                                    <MdModeEditOutline/>
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
                                    <RiDeleteBin6Line/>
                                </button>
                                <span>|</span>
                                <BiSolidDownArrow/>
                            </div>
                        </summery>
                        <div>
                            {
                                section?.subSection?.map((data)=>(
                                   <div key={data?._id} onClick={()=>setViewSubSection(data)} className="flex items-center justify-between gap-x-3 border-b-2">
                                        <div className="flex items-center gap-x-3">
                                            <RxDropdownMenu/>
                                            <p>{data?.title}</p>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <button onClick={()=>setEditSubSection({...data,sectionId:section._id})}> 
                                                <MdModeEditOutline/>
                                            </button>
                                            <button onClick={()=>setModal({
                                                text1:"Delete this Sub Section",
                                                text2:"Selected Lecture  will be deleted",
                                                btn1Text:"Delete",
                                                btn2Text:"Cancel",
                                                btn1Handler:()=>handleDeleteSubSection(data._id,section._id),
                                                btn2Handler:()=>setModal(null),
                                            })}>
                                                <RiDeleteBin6Line/>
                                            </button>
                                        </div>
                                   </div> 
                                ))
                            }
                            <button className="mt-4 flex-items-center gap-x-2 text-yellow-50" 
                                onClick={setAddSubSection(section._id)}>
                                <IoMdAdd className="text-yellow-50"/>
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