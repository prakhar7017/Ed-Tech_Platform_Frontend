import {RiArrowDownSLine} from "react-icons/ri"
import {RiArrowUpSLine} from "react-icons/ri"
import {BiVideo} from "react-icons/bi"
export default function Accordian({sections,isActive,id,handelisActive}){
    return(
        <div>
            {
                sections.length===0 ? (
                    <div>
                        NO Course Content
                    </div>
                ) 
                :
                (
                    sections?.map((section,index)=>(
                        <div key={index}>
                            <div>
                                <button
                                onClick={handelisActive(id)}>
                                    {
                                        isActive ? <RiArrowUpSLine/> : <RiArrowDownSLine/>
                                    }
                                    <p>{section.sectionName}</p> 
                                    <p>{`${section.subSection.length} lecture(s)`} </p>
                                </button>
                            </div>
                            <div>
                                    <BiVideo/>
                                    <span>{section.subSection.title}</span>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )   
}