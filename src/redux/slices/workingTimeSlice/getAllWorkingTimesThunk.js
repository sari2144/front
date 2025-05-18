//בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllWorkingTimeThunk = createAsyncThunk(
    'getAllWorkingTimeThunk',
    async () => {
        const response = await fetch('https://localhost:7215/api/WorkingTime/getAll');
        const data = await response.json();
        console.log(data);
        return data;

    }

)