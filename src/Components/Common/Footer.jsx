import React from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa"
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

const self=["About", "Careers", "Affiliates"]; 
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer=()=>{
    return (
        <div className="bg-richblack-800">
            <div className="w-11/12 flex lg:flex-col gap-8 items-center justify-between max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
                <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
                    <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
                        {/* logo  */}
                        <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
                            <img src={Logo} alt="studyNotion Logo" loading="lazy" className="object-conatain"></img>
                            <h1 className="text-[16px] font-semibold text-richblack-50">Company</h1>
                            <div className="flex flex-col gap-2">
                                {self.map((element,index)=>{
                                    return (
                                        <div key={index} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"><Link to={element.toLocaleLowerCase()}>{element}</Link></div>
                                    )
                                })}
                            </div>
                            <div className="flex flex-row gap-3 text-lg">
                            <FaFacebook/>
                            <FaGoogle/>
                            <FaTwitter/>
                            <FaYoutube/>
                            </div>
                        </div>
                        {/* resource  */}
                        <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                            <h1 className="text-richblack-50 font-semibold text-[16px]">Resources</h1>
                            <div className="flex flex-col gap-2 mt-2">
                                {Resources.map((element,index)=>{
                                    return (
                                        <div className={"text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"} key={index}><Link to={element.split(" ").join("-").toLowerCase()}>{element}</Link></div>
                                    )
                                })}
                            </div>

                            <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">Support</h1>
                            <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                                <Link to={"/help-center"}>Help Center</Link>
                            </div>
                        </div>

                        {/* plans  */}
                        <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                            <h1 className="text-richblack-50 font-semibold text-[16px]">Plans</h1>
                            <div className="flex flex-col gap-2 mt-2">
                            {Plans.map((element,index)=>{
                                return (
                                    <div key={index} className={"text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"}>
                                    <Link to={element.split(" ").join("-").toLowerCase()}>{element}</Link>
                                    </div>
                                )
                            })}
                            </div>
                            <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">Community</h1>
                            <div className="flex flex-col gap-2 mt-2">
                            {Community.map((element,index)=>{
                                return (
                                    <div key={index} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                    <Link to={element.split(" ").join("-").toLowerCase()}>{element}</Link>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    </div>
                    {/* after border  */}
                    <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
                    {FooterLink2.map((element,index)=>{
                        return (
                            <div key={index} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                                <h1 className="text-richblack-50 font-semibold text-[16px]">{element?.title}</h1>
                                <div className="flex flex-col gap-2 mt-2">
                                    {element.links.map((subElemet,subIndex)=>{
                                        return (
                                            <div key={subIndex} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"><Link to={subElemet.link}>{subElemet.title}</Link></div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}

                    </div>
                </div>
                {/* section 2 */}
                <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto text-sm">
                    <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
                        <div className="flex flex-row">
                            {BottomFooter.map((element,index)=>{
                                return (
                                    <div key={index} className={`${BottomFooter.length-1===index ? "cursor-pointer hover:text-richblack-50 transition-all duration-200":"border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"} px-3`}>
                                    <Link to={element.split(" ").join("-").toLocaleLowerCase()}>{element}</Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="text-center">Made with ❤️ Prakhar Maheshwari © 2023 Studynotion</div>
                </div>
            </div>
        </div>
    )

}

export default Footer;