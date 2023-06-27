import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux";
import {useDropzone} from "react-dropzone"
import { Player } from "video-react"
import { useEffect } from "react";
import "video-react/dist/video-react.css"

export default function Upload({name,label,register,errors,setValue,getValues,placeHolder,video = false,viewData = null,editData = null}){

    const {course}=useSelector((state)=>state.course);
    const [selectedFile,setSelectedFile]=useState(null);
    const [previewSource,setPreviewSource]=useState(viewData ? viewData : editData ? editData : "");

    const inputRef=useRef(null);

    const onDrop=(acceptedFiles)=>{
        // console.log(acceptedFiles)
        const file=acceptedFiles[0]
        if(file){
            previewFile(file)
            setSelectedFile(file)
        }
    }
    const { getInputProps, getRootProps, isDragAccept} =useDropzone({
        accept:!video ? 
        {
            "image/*":[".jpeg",".png",".jpg"]
        }:{
            "video/*":[".mp4"]
        },
        onDrop,
    });

    const previewFile=(file)=>{
        const reader=new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setPreviewSource(reader.result)
        }
    }

    useEffect(()=>{
        register(name,{required:true})
    },[register])

    useEffect(()=>{
        setValue(name,selectedFile)
    },[selectedFile])

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5">
                {label}
                <span className="text-pink-200"> *</span>

                <div className={`${isDragAccept ? "bg-richblack-600" : "bg-richblack-700"} flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}>

                {
                    previewSource ? (
                        <div className="flex w-full flex-col p-6">
                            {
                                !video ? 
                                    (<img src={previewSource}
                                        alt="Preview"
                                        className="h-full w-full rounded-md object-cover"
                                    />) 
                                    :
                                    (<Player aspectRatio="16:9" playsInline src={previewSource}/>)
                            }
                            {
                                !viewData &&
                                (
                                    <button
                                    type="button"
                                    onClick={()=>{
                                        setPreviewSource("")
                                        setSelectedFile(null)
                                        setValue(name,null)
                                    }} className="mt-3 text-richblack-400 underline">Cancel</button>
                                )
                            }
                        </div>
                    ) : (
                        <div className="flex w-full flex-col items-center p-6" {...getRootProps()}>
                            <input
                                {...getInputProps()}
                                ref={inputRef}
                            />
                            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                                <FiUploadCloud className="text-2xl text-yellow-50"/>
                            </div>
                            <p>
                                Drag and drop an {!video ? "Image" :"video"}, or click to {""}
                                <span className="font-semibold text-yellow-50">Browse </span>
                                a file
                            </p>
                            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
                                <li>Aspect ratio 16:9</li>
                                <li>Recommended size 1024x576</li>
                            </ul>
                        </div>
                    )
                }
                </div>
            </label>
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )}
        </div>
    )
}