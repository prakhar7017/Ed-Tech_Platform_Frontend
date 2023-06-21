import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi"
import IconButton from "../../../Common/IconButton";
import {updateDisplayPicture} from "../../../../Services/Operations/SettingAPI"

export default function ChangeProfilePicture(){
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const [loading,setLoading]=useState(false);
    const [imageFile,setImageFile]=useState(null);
    const [previewImageSouce,setPreviewImageSource]=useState(null)

    const fileInput=useRef(null);

    const handleOnClick=()=>{
        // means jab ma select pa click karuga tab fileinput pa click event activate hoga 
        fileInput.current.click();
    }

    const handleOnChange=(e)=>{
        const file=e.target.files[0];
        if(file){
            setImageFile(file)
            PreviewImage(file);
        }
    }

    const PreviewImage=(file)=>{
            const reader= new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend=()=>{
                setPreviewImageSource(reader.result);
            }
    
    }

    const hangleOnFileUpload=async ()=>{
        try {
            setLoading(true);
            const formData=new FormData();
            console.log(imageFile);
            formData.append("displayPicture",imageFile);
            console.log(formData);
            dispatch(updateDisplayPicture(token,formData)).then(()=>{
                setLoading(false)
            })
        } catch (error) {
            console.lof(error);
        }
    }

        useEffect(()=>{
            if(imageFile){
                PreviewImage(imageFile)
            }
        },[imageFile])
    return (
        <>
            <div className="flex justify-between items-center rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
                <div className="flex gap-x-4 items-center">
                    <img src={previewImageSouce ||user?.image} alt={`profile-${user?.firstName}`} className="aspect-square w-[78px] rounded-full object-cover"/>
                    <div className="space-y-2">
                        <p className="">Change Profile Picture</p>
                        <div className="flex gap-x-3">
                            <input type="file" className="hidden" accept="image/png, image/gif, image/jpeg" ref={fileInput} onChange={handleOnChange}/>
                            <button  disabled={loading} className="cursor-pointer bg-richblack-700 font-semibold text-richblack-50 py-2 px-5 rounded-md" onClick={handleOnClick}>
                                Select
                            </button>
                            <IconButton text={loading ? "Uploading.." : "Upload"}  onclick=
                            {hangleOnFileUpload}>
                                {
                                    !loading && (<FiUpload className="text-lg text-richblack-900"/>)
                                }
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}