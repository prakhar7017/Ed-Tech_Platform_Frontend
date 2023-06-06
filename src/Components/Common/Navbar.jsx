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
    const { totalItem} =useSelector((state)=>state.cart);
 
    const location=useLocation();

    const [subLinks,setSubLinks]=useState([]);

    const fetchSubLinks = async ()=>{
            try {
                const data= await apiConnector("GET",Categories.CATEGORIES_API);

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
        <div className="flex h-14 items-center justify-center border-b-[1px] border-richblack-700 ">
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

                                            <div className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[80%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4  text-richblack-900 opacity-0 transition-all  duration-200 group-hover:visible group-hover:opacity-100 lg:w-[250px] -mt-10 ">

                                                <div className="absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5">
                                                </div>
                                                {
                                                    subLinks.map((element,index)=>{
                                                        return (
                                                            <div className={`${index==subLinks.length-1 ?"" : "border-b"} text-sm font-mono font-medium`} key={index}>
                                                                <Link to={element.name.split(" ")[0].toLowerCase()}>{element.name}</Link>
                                                            </div>
                                                        )
                                                    })
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
                <div className="flex gap-x-4 items-center">
                    {
                        user && user?.accountType != "Instructor" && (
                            <Link to="/dashboard/cart" className="relative">
                                <AiOutlineShoppingCart/>
                                {
                                    totalItem>0 && (
                                        <span>
                                            {totalItem}
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