//בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getQueuesThunk = createAsyncThunk(
    'getQueuesThunk',
    async()=>{
        debugger
        const response = await fetch('https://172.16.17.6:7215/api/Queue/getAll');
        debugger
        const data = await response.json();
        console.log(data); 
        return data;
       
    }
    

)