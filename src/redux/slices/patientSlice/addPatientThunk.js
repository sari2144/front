// בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const addPatientThunk = createAsyncThunk(
    'addPatientThunk',
    async (patient) => {
        debugger
        const response = await fetch('https://localhost:7215/api/Patient/add',
        {
            method:'POST',
            body:JSON.stringify(patient),
            headers:{
                'Content-type': 'application/json'
            }
        });
        if(response.ok){
            const data = await response.json();
            return data;
        }
        else 
            throw new Error("erroe:(")

    }

)


