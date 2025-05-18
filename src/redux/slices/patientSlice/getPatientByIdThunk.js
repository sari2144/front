//בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPatientByIdThunk = createAsyncThunk(
    'getPatientByIdThunk',
    async(id)=>{
        debugger
        const response = await fetch('https://localhost:7215/api/Patient/getById/' + id);
        const data = await response.json();
        console.log(data); 
        return data;
       
    }

)