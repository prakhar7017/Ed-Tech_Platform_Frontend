import { useState } from "react";
import {Chart,registerables} from "chart.js"
import {Pie} from "react-chartjs-2";

Chart.register(...registerables);

export default function InstructorChart({courses}){
    const [currentChart,setCurrentChart]=useState("Student");

    const getRandomColors=(numColors)=>{
        const colors=[];
        for(let i=0;i<numColors;i++){
            const color=`rgba(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)}`
            colors.push(color);
        }
        return colors;
    }

    // create data for chart displaying student info

    const chartDataForStudents={
        labels:courses.map((course)=>course.courseName),
        datasets:[{
            data:courses.map((course)=>course.totalStudent),
            backgroundColor:getRandomColors(courses.length)
        }]
    }

    // create data for chart displaying income info

    const chartDataForIncome={
        labels:courses.map((course)=>course.courseName),
        datasets:[{
            data:courses.map((course)=>course.totalIncome),
            backgroundColor:getRandomColors(courses.length)
        }]
    }
    // create options 
    const options={
        maintainAspectRatio: false,
    }


    return( 
        <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
            <div>
                <p className="text-lg font-bold text-richblack-5">Visulise</p>
            </div>
            <div className="space-x-4 font-semibold">
                <button onClick={()=>setCurrentChart("Student")}
                className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                    currentChart === "students"
                    ? "bg-richblack-700 text-yellow-50"
                    : "text-yellow-400"
                }`}>Student</button>
                <button onClick={()=>setCurrentChart("Income")}
                    className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                    currentChart === "students"
                    ? "bg-richblack-700 text-yellow-50"
                    : "text-yellow-400"
                }`}>Income</button>
            </div>
            <div className="relative mx-auto aspect-square h-full w-full">
                <Pie data={currentChart==="Student" ? chartDataForStudents: chartDataForIncome}
                options={options}
                />
            </div>

        </div>
    )    

}