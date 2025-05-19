//ס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllArchiveThunk = createAsyncThunk(
    'getAllArchiveThunk',
    async()=>{
        const response = await fetch('https://localhost:7215/api/Archive/getAll');
        debugger
        const data = await response.json();
        console.log(data); 
        return data;
       
    }

)