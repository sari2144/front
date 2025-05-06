import { createSlice } from "@reduxjs/toolkit"
import { getAllDataThunk } from "./getAllDataThunk"
import { getQueuesDataThunk } from "./getQueuesDataThunk"

const INITIAL_STATE = {
    allLists:{},
    queuesLists:{}
}

export const AllDataSlice = createSlice({
    name:'AllDataSlice',
    initialState:INITIAL_STATE,
    reducers:{
        
    },

    extraReducers:(builder)=>{
      builder.addCase(getAllDataThunk.fulfilled , (state , action) => {
        debugger
        state.allLists = action.payload
     })  

     builder.addCase(getQueuesDataThunk.fulfilled , (state , action) => {
      debugger
      state.queuesLists = action.payload
   })  
      
  }
})