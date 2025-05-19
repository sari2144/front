// בס"ד///


import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateArchiveThunk = createAsyncThunk(
   
    'updateArchiveThunk',
    async (archiveQ) => {
        debugger
        const response = await fetch('https://localhost:7215/api/Archive/update',
        {
        method:'PUT',
        body:JSON.stringify(archiveQ),
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
