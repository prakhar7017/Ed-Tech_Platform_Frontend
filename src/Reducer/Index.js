import React from "react";
import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice";
import profileReducer from "../Slices/profileSlice";
import cartReducer from "../Slices/CartSlice"
import courseReducer from "../Slices/courseSlice"


const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer

})

export default rootReducer;