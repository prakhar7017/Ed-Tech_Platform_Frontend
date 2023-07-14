import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {Categories} from "../Services/Apis"
import {apiConnector} from "../Services/ApiConnector"
import Footer from "../Components/Common/Footer"
import getCatalogaPageData from "../Services/Operations/PageAndComponentData";
import CourseSlider from "../Components/Core/Catalog/CourseSlider";
import Course_Card from "../Components/Core/Catalog/Course_Card";

export default function Catalog(){
    const {categoryName}=useParams();
    const [active,setActive]=useState("Most Popular");
    const [loading,setLoading]=useState(false);
    const [categoryPageDate,setCategoryPageData]=useState();
    const [categoryId,setCategoryId]=useState();

    useEffect(()=>{
        const getCategories=async ()=>{
            setLoading(true);
            const result=await apiConnector("GET",Categories.CATEGORIES_API,null,null,null);
            setLoading(false);
            const category_id=result.data.allCategory?.filter((category)=>category.name.split(" ").join("-").toLowerCase()===categoryName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[categoryName])

    useEffect(()=>{
        const getCategoryDetails=async ()=>{
            try {
                setLoading(true);
                const result=await getCatalogaPageData(categoryId);
                console.log(result);
                setLoading(false);
                setCategoryPageData(result);
            } catch (error) {
                console.log(error);
            }
        }

        if(categoryId){
            getCategoryDetails();
        }
    },[categoryId])

    return (
        <div>
            <div className="px-4 bg-richblack-800 box-content">
                <div className="flex flex-col mx-auto lg:max-w-maxContent max-w-maxContentTab justify-center gap-4 min-h-[16.25rem]">
                    <p className="text-sm text-richblack-300">
                        {`Home / Catalog / `}
                        <span className="text-yellow-25">{categoryPageDate?.data?.selectedCategoryCourse?.name}</span>
                    </p>
                    <p className="text-3xl text-richblack-5">
                        {categoryPageDate?.data?.selectedCategoryCourse?.name}
                    </p>
                    <p className="max-w-[54.375rem] text-richblack-200 text-base ">
                        {categoryPageDate?.data?.selectedCategoryCourse?.description}
                    </p>
                </div>
            </div>
            

            {/* section `` */}
            <div className="bg-richblack-900 px-4 box-content">
                <div className="flex flex-col mx-auto lg:max-w-maxContent max-w-maxContentTab justify-center gap-4 mt-[3.125rem]">
                    <h1 className="text-4xl text-richblack-5 font-bold font-inter">Courses to get you started</h1>
                    <div className="flex border-b border-b-richblack-600 gap-x-4 text-sm my-4">
                        <button className={`px-4 py-2 border-b
                        ${active==="Most Popular" ? " border-b-yellow-25 text-yellow-25" :"border-none text-richblack-300" } cursor-pointer
                        `} onClick={()=>setActive("Most Popular")}>Most Popular</button>
                        <button className={`px-4 py-2 border-b
                        ${active==="New" ? " border-b-yellow-25 text-yellow-25" :"border-none text-richblack-300" } cursor-pointer
                        `}>New</button>
                    </div>
                    <div>
                        <CourseSlider Courses={categoryPageDate?.data?.selectedCategoryCourse?.course} />
                    </div>
                </div>
            </div>
            
            {/* section 2 */}
            <div className="bg-richblack-900 px-4 box-content">
                <div className="flex flex-col mx-auto lg:max-w-maxContent max-w-maxContentTab justify-center gap-4 mt-[3.125rem]">
                    <h1 className="text-4xl text-richblack-5 font-bold font-inter">
                        Top courses in {categoryPageDate?.data?.differentCategory?.name}
                    </h1>
                    <div>
                        <CourseSlider Courses={categoryPageDate?.data?.differentCategory?.course} />
                    </div>
                </div>
            </div>
            
            {/* section 3 */}
           <div className="bg-richblack-900 px-4 box-content">
                <div className="flex flex-col mx-auto lg:max-w-maxContent max-w-maxContentTab justify-center gap-4 mt-[3.125rem]">
                    <h1 className="text-4xl text-richblack-5 font-bold font-inter">
                        Frequently Bought
                    </h1>
                    <div className="py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {
                                categoryPageDate?.data?.mostSellingCourse?.slice(0,4).map((course,index)=>(
                                    <Course_Card course={course} key={index} Height={"h-[400px]"}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
           </div>
            <Footer/>
        </div>
    )
}