import {createSlice} from "@reduxjs/toolkit"
import { toast} from "react-hot-toast"


const initialState={
    totalItem:localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")): 0
}

const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItems(state,value){
            state.totalItem=value.payload
        }
    }
})

export const {setTotalItems}=cartSlice.actions;
export default cartSlice.reducer;