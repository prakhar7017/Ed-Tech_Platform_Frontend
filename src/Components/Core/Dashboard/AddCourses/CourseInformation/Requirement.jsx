import React, { useState } from "react";
import { useEffect } from "react";


export default function Requirement({name,label,register,errors,setValue,getValue}){
    const [requirement,setReqirement]=useState();
    const [requirementList,setReqirementList]=useState([]);

    const handleOnAdd=()=>{
        if(requirement){
            setReqirementList([...requirementList,requirement]);
            setReqirement("");
        }
    }

    const handleOnRemove=(reqIndex)=>{
        const updatedRequirements=requirementList.filter((_,index)=>index!=reqIndex);
        setReqirementList(updatedRequirements);
    }

    useEffect(()=>{
        register(name,{
            required:true,
            validate:(value)=>value.length>0
        })
    },[]);

    useEffect(()=>{
        setValue(name,requirementList)
    },[requirementList])


    return (
        <>
            <div>
                <label>
                    {label}
                    <sup>*</sup>
                    <input
                        type="text"
                        id={name}
                        value={requirement}
                        onChange={(e)=>setReqirement(e.target.value.trim())}
                    />
                    <button type="button" onClick={handleOnAdd}>Add</button>
                    {
                        requirementList.length > 0 && (
                            <ul>
                                {
                                    requirementList.map((element,index)=>(
                                        <li key={index}>
                                            <span>{element}</span>
                                            <button
                                            type="button" onClick={handleOnRemove(index)}>Clear</button>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                    {errors[name] && (
                        <span>{label} is required</span>
                    )}
                </label>
            </div>
        </>
    )
}