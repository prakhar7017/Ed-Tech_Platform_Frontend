import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux";


export default function  ChipsTag({name,label,register,errors,setValue,getValues,placeHolder}){

    const [tag,setTag]=useState("");
    const [tagList,setTagList]=useState([]);

    const {editCourse,course}=useSelector((state)=>state.course)



    useEffect(()=>{
        if(editCourse){
            setTagList(course?.tag)
        }
        register(name,{required:true, validate:(value)=>value.length>0})
    },[])

    useEffect(()=>{
        setValue(name,tagList);
    },[tagList])

    const handleOnAdd=(e)=>{
        if(e.key==="Enter" || e.key===","){
            e.preventDefault()

            if(tag && !tagList.includes(tag)){
                setTagList([...tagList,tag])
                setTag("")
                e.target.value=""
            }
            
        }
    }

    const handleOnRemove=(tagindex)=>{
        const updatedTagList=tagList.filter((_,index)=>index!=tagindex)
        setTagList(updatedTagList)
    }

    

    return (
        <>
            <div>
                <label>
                    {label}
                    <sup>*</sup>
                    <div>
                        {
                            tagList.length>0 && (
                                <div>
                                    {
                                            tagList.map((element,index)=>(
                                                <div key={index} className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5">
                                                {element}
                                                 <button
                                                    type="button"
                                                    className="ml-2 focus:outline-none"
                                                    onClick={handleOnRemove(index)}>
                                                    <MdClose className="text-sm"/>
                                                 </button>
                                                </div>
                                            ))
                                    }
                                </div>
                            )
                        }
                        <input
                            type="text"
                            id={name}
                            placeholder={placeHolder}
                            value={tag}
                            onChange={(e)=>e.target.value.trim()}
                            onKeyDown={handleOnAdd}
                        />
                    </div>
                </label>
            </div>
            {
                errors[name] && (
                    <span>
                        {label} is required
                    </span>)
            }
        </>
    )
}