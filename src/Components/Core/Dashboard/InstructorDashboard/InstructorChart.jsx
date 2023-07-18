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

    }


    return( 
        <div>
            <div>
                <p>Visulise</p>
            </div>
            <div>
                <button onClick={()=>setCurrentChart("Student")}>Student</button>
                <button onClick={()=>setCurrentChart("Income")}>Income</button>
            </div>
            <div>
                <Pie data={currentChart==="Student" ? chartDataForStudents: chartDataForIncome}
                    options={options}
                />
            </div>

        </div>
    )    

}