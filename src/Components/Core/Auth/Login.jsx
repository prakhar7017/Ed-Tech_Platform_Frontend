import React from "react";
import Template from "../../Common/Template";
import loginImg from "../../../assets/Images/login.webp"

const Login=()=>{
    // const Base_URL= process.env.REACT_APP_BASE_URL
    // console.log(Base_URL)
    return (
        <Template
            title="Welcome Back"
            description1="Build skills for today, tomorrow, and beyond."
            description2="Education to future-proof your career."
            image={loginImg}
            formType="login"
        />
    )
}
export default Login;