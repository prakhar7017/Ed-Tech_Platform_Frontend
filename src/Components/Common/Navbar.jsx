import React from "react";
import {NavbarLinks} from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from "react-router-dom";
import { useSelector } from "react-redux";
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from "../Core/Auth/ProfileDropDown"

const Navbar=()=>{ 

    const { token }=useSelector((state)=>state.auth);
    const { user } =useSelector((state)=>state.profile);
    const { totalItem} =useSelector((state)=>state.cart);
 
    const location=useLocation();

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
                                {element.title==="Catalog" ?(<div>
                                    
                                </div>):(<Link to={element?.path}><p className={`${matchRoute(element?.path) ? "text-yellow-25" :"text-richblack-25"}`}>{element.title}</p></Link>)}
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