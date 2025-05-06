// בס"ד///


import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateWorkingTimeThunk = createAsyncThunk(
   
    'updateWorkingTimeThunk',
    async (q) => {
        debugger
        const response = await fetch('https://172.16.17.6:7215/api/WorkingTime/update',
        {
        method:'PUT',
        body:JSON.stringify(q),
        headers:{
            'Content-type': 'application/json'
        }}
        );
        if(response.ok){
            const data = await response.json();
            return data;
        }
        else 
            throw new Error("erroe:( ")
    }

)
