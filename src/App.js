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
import ContactUs from "./Pages/ContactUs";
import OpenRoute from "./Components/Core/Auth/OpenRoute";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}></Route>
          <Route path="/signup" element={<OpenRoute><SignUp/></OpenRoute>}></Route>
          <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}></Route>
          <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword/></OpenRoute>}></Route>
          <Route path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>}></Route>
          <Route path="/about" element={<OpenRoute><About/></OpenRoute>}></Route>
          <Route path="/contact" element={<OpenRoute><ContactUs/></OpenRoute>}></Route>
      </Routes>
    </div>
  );
}

export default App;
