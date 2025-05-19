//בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getQueuesThunk = createAsyncThunk(
    'getQueuesThunk',
    async()=>{
        debugger
        const response = await fetch('https://localhost:7215/api/Queue/getAll');
        debugger
        const data = await response.json();
        console.log(data); 
        return data;
       
    }
    

)