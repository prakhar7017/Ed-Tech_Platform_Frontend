import React from "react";
import Template from "../../Common/Template";
import signupImg from "../../../assets/Images/signup.webp";

const SignUp=()=>{
    return (
        <Template
            title="Welcome Back"
            description1="Build skills for today, tomorrow, and beyond."
            description2="Education to future-proof your career."
            image={signupImg}
            formType="signup"
        />
    )
}

export default SignUp;