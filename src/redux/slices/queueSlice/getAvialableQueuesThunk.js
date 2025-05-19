// בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAvialableQueuesThunk = createAsyncThunk(
    'getAvialableQueuesThunk',
    async()=>{
        const response = await fetch('https://localhost:7215/api/AvialableQueue/getAll');
        debugger
        const data = await response.json();
        console.log(data); 
        return data;
       
   } 

)