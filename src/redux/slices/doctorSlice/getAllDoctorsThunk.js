//בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllDoctorThunk = createAsyncThunk(
    'getAllDoctorThunk',
    async()=>{
        const response = await fetch('https://172.16.17.6:7215/api/Doctor/getAll');
        debugger
        const data = await response.json();
        console.log(data); 
        return data;
       
    }

)