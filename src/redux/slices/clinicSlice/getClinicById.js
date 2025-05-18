//בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getClinicByIdThunk = createAsyncThunk(
    'getClinicByIdThunk',
    async(id)=>{
        const response = await fetch('https://localhost:7215/api/Clinic/getById/' + id);
        debugger
        const data = await response.json();
        console.log(data); 
        return data;
       
    }

)