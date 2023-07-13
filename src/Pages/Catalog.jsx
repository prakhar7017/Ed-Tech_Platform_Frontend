import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {Categories} from "../Services/Apis"
import {apiConnector} from "../Services/ApiConnector"
import Footer from "../Components/Common/Footer"
import getCatalogaPageData from "../Services/Operations/PageAndComponentData";

export default function Catalog(){
    const {categoryName}=useParams();
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
            <div>
                <p>
                    {`Home / Catalog / `}
                    <span>{categoryPageDate?.data?.selectedCategory?.name}</span>
                </p>
                <p>
                    {categoryPageDate?.data?.selectedCategory?.name}
                </p>
                <p>
                    {categoryPageDate?.data?.selectedCategory?.description}
                </p>
            </div>

            {/* section `` */}
            <div>
                <h1>Courses to get you started</h1>
                <div>
                    <p>Most Popular</p>
                    <p>New</p>
                </div>
                <div>
                    <CourseSlider Courses={categoryPageDate?.data?.selectedCategory?.coures} />
                </div>
            </div>
            {/* section 2 */}
            <div>
                <h1>
                    Top courses in {categoryPageDate?.data?.differentCategory?.name}
                </h1>
                <div>
                    <CourseSlider Courses={categoryPageDate?.data?.differentCategory?.coures} />
                </div>
            </div>
            {/* section 3 */}
            <div>
                <h1>
                    Frequently Bought
                </h1>
                <div className="py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {
                            categoryPageDate?.data?.mostSellingCourses?.slice(0,4).map((course,index)=>(
                                <Course_Card course={course} key={index} Height={"h-[400px]"}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}