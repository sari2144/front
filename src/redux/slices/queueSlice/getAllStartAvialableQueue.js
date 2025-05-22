//בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllStartAQueuesThunk = createAsyncThunk(
    'getAllStartAQueuesThunk',
    async () => {
        const response = await fetch('https://localhost:7215/api/AvialableQueue/getAllStartQueue');
        const data = await response.json();
        console.log("9999999999999999999");
        console.log(data);
        console.log("9999999999999999999");
        return data;

    }

)