//בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getQueuesDataThunk = createAsyncThunk(
    'getQueuesDataThunk',
    async()=>{
        const response = await fetch('https://localhost:7215/api/GetAllData/getQueuesData');
        debugger
        const data = await response.json();
        console.log(data,'allQueuesData'); 
        return data;  
    }

)