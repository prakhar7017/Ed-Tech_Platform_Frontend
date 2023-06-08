import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Common/Navbar";
import "./App.css";
import Login from "./Components/Core/Auth/Login";
import SignUp from "./Components/Core/Auth/SignUp";
import ForgotPassword from "./Pages/Forgot";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
