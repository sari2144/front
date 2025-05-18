// בס"ד///


import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateQueueThunk = createAsyncThunk(
   
    'updateQueueThunk',
    async (q) => {
        debugger
        const response = await fetch('https://localhost:7215/api/Queue/update',
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
