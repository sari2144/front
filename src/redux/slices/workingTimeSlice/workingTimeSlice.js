import { createSlice } from "@reduxjs/toolkit"
import { getAllWorkingTimeThunk } from "./getAllWorkingTimesThunk"


const INITIAL_STATE = {
    workingTimeList:[]
}

export const WorkingTimeSlice = createSlice({
    name:'WorkingTimeSlice',
    initialState:INITIAL_STATE,
    reducers:{
        
    },

    extraReducers:(builder)=>{
        
        builder.addCase(getAllWorkingTimeThunk.fulfilled, (state, action) => {
            state.workingTimeList = action.payload
        })
  }
})