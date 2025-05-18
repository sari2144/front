//ס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPatientsThunk = createAsyncThunk(
    'getPatientsThunk',
    async()=>{
        const response = await fetch('https://localhost:7215/api/Patient/getAll');
        debugger
        const data = await response.json();
        console.log(data); 
        return data;
       
    }

)