import React from "react";


const stats=[{count:"5K",label:"Active Students"},{count:"10+",label:"Mentors"},{count:"200+",label:"Courses"},{count:"50+",label:"Awards"}]
const Stats=()=>{
    return (
        <div>
            <div>
                <div className="flex gap-x-4">
                    {stats.map((element,index)=>{
                        return (
                            <div key={index}>
                                <h1>{element.count}</h1>
                                <h2>{element.label}</h2>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default Stats;