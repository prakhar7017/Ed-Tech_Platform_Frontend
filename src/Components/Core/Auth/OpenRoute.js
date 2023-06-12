import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OpenRoute=({children})=>{
    const navigate=useNavigate();
    const { token }=useSelector((state)=>state.auth)

    if(token===null){
        return children
    }else{
        navigate("/dashboard/my-profile");
    }

}

export default OpenRoute;