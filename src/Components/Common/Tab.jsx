export default function Tab ({tabData,field,setfield}){
    return (
        <div className="lg:flex text-richblack-800 p-1 gap-x-1 my-6 rounded-full lg:max-w-max">
            {
                tabData.map((element)=>{
                    <button key={element.id} onClick={()=>setfield(element.type)} className={`${field===element.type  ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200}`}>
                    {element?.tabName}
                    </button>
                })
            }
        </div>
    )

} 