import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Common/Navbar";
import "./App.css";
import Login from "./Components/Core/Auth/Login";
import SignUp from "./Components/Core/Auth/SignUp";
import ForgotPassword from "./Pages/Forgot";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import About from "./Pages/About";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/update-password/:id" element={<UpdatePassword/>}></Route>
          <Route path="/verify-email" element={<VerifyEmail/>}></Route>
          <Route path="/about" element={<About/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
