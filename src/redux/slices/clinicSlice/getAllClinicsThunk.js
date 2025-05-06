//בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllClinicThunk = createAsyncThunk(
    'getAllClinicThunk',
    async()=>{
        const response = await fetch('https://172.16.17.6:7215/api/Clinic/getAll');
        debugger
        const data = await response.json();
        console.log(data); 
        return data;
       
    }

)