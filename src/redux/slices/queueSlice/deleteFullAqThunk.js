// בס"ד


import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteFullAq = createAsyncThunk(
   
    'deleteFullAq',
    async ({startH , startM , date}) => { debugger
        const response = await fetch(`https://172.16.17.6:7215/api/AvialableQueue/deleteFullAq/${startH}/${startM}/${date}`,
        {
            method:'DELETE',
            body:JSON.stringify(''),
            headers:{
                'Content-type': 'application/json'
        }}
            )
        if(response.ok){
            const data = await response.json();
            return data;
        }
        else 
            throw new Error("error:(")
    }

)
