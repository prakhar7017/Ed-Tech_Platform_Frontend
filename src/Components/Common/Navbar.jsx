import React, { useEffect, useState } from "react";
import {NavbarLinks} from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from "react-router-dom";
import { useSelector } from "react-redux";
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from "../Core/Auth/ProfileDropDown"
import { apiConnector } from "../../Services/ApiConnector";
import { Categories } from "../../Services/Apis";
import {IoIosArrowDropdownCircle} from "react-icons/io"

const Navbar=()=>{ 
    const { token }=useSelector((state)=>state.auth);
    const { user } =useSelector((state)=>state.profile);
    const { totalItems } =useSelector((state)=>state.cart);
 
    const location=useLocation();

    const [subLinks,setSubLinks]=useState([]);
    const [loading,setLoading]=useState(false);

    const fetchSubLinks = async ()=>{
            try {
                const data= await apiConnector("GET",Categories.CATEGORIES_API,null,null,null);
                console.log(data);
                setSubLinks(data.data.allCategory)
            } catch (error) {
                console.log(error);
            }
    }

    useEffect(()=>{
        fetchSubLinks();
    },[])

    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname);
    }
    return (
        <div className="flex h-14 items-center justify-center border-b-[1px] border-richblack-700 bg-richblack-800 ">
            <div className="w-11/12 flex flex-row max-w-maxContent items-center justify-between mx-auto">
                <Link to="/">
                    <img src={Logo} width={160} height={42} loading="lazy" />
                </Link>

                {/* nav links  */}
                <nav>
                    <ul className="flex flex-row gap-x-6 text-white">
                    {NavbarLinks.map((element,index)=>{
                        return (
                            <li key={index}>
                                {
                                    element.title==="Catalog" ? (
                                        <div className="flex  items-center gap-x-2 relative group z-10 ">
                                            <p>{element.title}</p>
                                            <IoIosArrowDropdownCircle/>

                                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">

                                                <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5">
                                                </div>
                                                {
                                                    loading ? (
                                                        <p className="text-center">Loading...</p>
                                                    )
                                                    :
                                                    subLinks.length > 0 ? (
                                                        <>
                                                            {
                                                                subLinks?.map((subLink,index)=>(
                                                                    <Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`
                                                                    }
                                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                    key={index}>
                                                                        <p>{subLink?.name}</p>
                                                                    </Link>
                                                                ))
                                                            }
                                                        </>
                                                    ):(<p className="text-center">No Course Found</p>)
                                                }
                                            </div>                                            
                                        </div>
                                    )
                                    :
                                    (
                                        <Link to={element?.path}><p className={`${matchRoute(element?.path) ? "text-yellow-25" :"text-richblack-25"}`}>{element.title}</p></Link>
                                    )
                                }
                            </li>
                        )
                    })}
                    </ul>
                </nav>

                {/* login/signin/dashboard  */}
                <div className="flex gap-x-4 items-center text-2xl, text-richblack-100">
                    {
                        user && user?.accountType != "Instructor" && (
                            <Link to="/dashboard/cart" className="relative">
                                <AiOutlineShoppingCart size={"25px"} />
                                {
                                    totalItems>0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token===null && (
                            <Link to="/login">
                                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token===null && (
                            <Link to="/signup">
                                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown/> 
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;


// subLinks.map((element,index)=>{
//     return (
//         <div className={`${index==subLinks.length-1 ?"" : "border-b"} rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50`} key={index}>
//             <Link to={element.name.split(" ")[0].toLowerCase()}>{element.name}</Link>
//         </div>
//     )
// })