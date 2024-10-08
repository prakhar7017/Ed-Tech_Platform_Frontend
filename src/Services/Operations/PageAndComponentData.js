import { toast } from "react-hot-toast";
import {apiConnector} from "../ApiConnector";
import {catalogData} from "../Apis"
import { useSelector } from "react-redux";

export default async function getCatalogaPageData(categoryId){
    const toastId=toast.loading("Loading...");
    // const {token}=useSelector((state)=>state.auth);
    let result=[];
    try {
        const response=await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId},null,null);
        
        if(!response.data.success){
            throw new Error("Could not Fetch Category page data");
        }
        result=response?.data
    } catch (error) {
        console.log("CATALOG PAGE DATA API ERROR....", error);
        toast.error(error.message);
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}