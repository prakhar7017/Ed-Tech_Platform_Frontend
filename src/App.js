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
import DashBoard from "./Pages/DashBoard";
import PrivateRoute from "./Components/Common/PrivateRoute";
import MyProfile from "./Pages/MyProfile";
import Settings from "./Components/Core/Dashboard/Settings/Settings";
import Error from "./Pages/Error"
import EnrolledCourses from "./Components/Core/Dashboard/EnrolledCourses";
import Cart from "./Components/Core/Dashboard/Cart/Cart"

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
          <Route element={<PrivateRoute><DashBoard/></PrivateRoute>}>
              <Route path="/dashboard/my-profile" element={<MyProfile/>}></Route>
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}></Route>
              <Route path="/dashboard/cart" element={<Cart/>}></Route>
              <Route path="/dashboard/settings" element={<Settings/>}></Route>
          </Route>

          <Route path="*" element={<OpenRoute><Error/></OpenRoute>}></Route>

      </Routes>
    </div>
  );
}

export default App;
