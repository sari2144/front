//בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllClinicThunk = createAsyncThunk(
    'getAllClinicThunk',
    async()=>{
        const response = await fetch('https://localhost:7215/api/Clinic/getAll');
        debugger
        const data = await response.json();
        console.log(data); 
        return data;
       
    }

)