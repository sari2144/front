//בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllDataThunk = createAsyncThunk(
    'getAllDataThunk',
    async()=>{
        const response = await fetch('https://localhost:7215/api/GetAllData/getAll');
        debugger
        const data = await response.json();
        console.log(data,'allData'); 
         
        return data;  
    }

)