//בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPatientByIdThunk = createAsyncThunk(
    'getPatientByIdThunk',
    async(id)=>{
        const response = await fetch('https://172.16.17.6:7215/api/Patient/getById/' + id);
        debugger
        const data = await response.json();
        console.log(data); 
        return data;
       
    }

)