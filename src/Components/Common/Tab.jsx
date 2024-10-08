export default function Tab ({tabData,field,setfield}){
    return (
        <div className="lg:flex lg:flex-row flex-col  text-richblack-800 p-1 gap-x-1 my-6 rounded-full lg:max-w-max"         style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}>
            {
                tabData.map((element)=>(
                    <button key={element.id} onClick={()=>setfield(element.type)} className={`${field===element.type  ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200}`}>
                    {element?.tabName}
                    </button>
                ))
            }
        </div>
    )

} 