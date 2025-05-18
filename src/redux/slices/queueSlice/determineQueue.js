// בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const determineQueue = createAsyncThunk(
    'determineQueue',
    async (newQ) => {
        debugger
        const response = await fetch('https://localhost:7215/api/Queue/add',
        {
            method:'POST',
            body:JSON.stringify(newQ),
            headers:{
                'Content-type':'application/json'
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

