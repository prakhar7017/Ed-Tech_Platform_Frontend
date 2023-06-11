import React from "react";


const stats=[{count:"5K",label:"Active Students"},{count:"10+",label:"Mentors"},{count:"200+",label:"Courses"},{count:"50+",label:"Awards"}]
const Stats=()=>{
    return (
        <div className="bg-richblack-700">
            <div>
                <div className="flex gap-x-4 justify-around items-center">
                    {stats.map((element,index)=>{
                        return (
                            <div key={index} className="flex flex-col py-10">
                                <h1 className="text-[1.875rem] font-bold text-richblack-5 text-center">{element.count}</h1>
                                <h2 className="font-semibold text-[16px] text-richblack-500
                                    Object properties">{element.label}</h2>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default Stats;