// בס"ד


import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteDetermineQThunk = createAsyncThunk(
   
    'deleteDetermineQThunk',
    async ({q,backToAvialable}) => { debugger
        const response = await fetch(`https://localhost:7215/api/Queue/cancelQueue/${backToAvialable}`,
        {
        method:'DELETE',
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
            throw new Error("erroe:(")
    }

)
