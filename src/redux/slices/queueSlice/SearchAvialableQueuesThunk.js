//בס"ד
import { createAsyncThunk } from "@reduxjs/toolkit";

export const SearchAvialableQueuesThunk = createAsyncThunk(
    'SearchAvialableQueuesThunk',
    async ({ id, dayWeek, doctorName, city, minHour, maxHour, date, isDouble }) => {
        if (doctorName == '')
            doctorName = ' '
        if (city == '')
            city = ' '
        if (minHour == 0 || minHour == '')
            doctorName = -1
        if (maxHour == '' || maxHour == '')
            maxHour = -1
        if (date == '')
            doctorName = '01-01-2020'
        debugger
        const response = await fetch(`https://localhost:7215/api/AvialableQueue/getByCondition/${id}/${dayWeek}/${doctorName}/${city}/${minHour}/${maxHour}/${date}/${isDouble}`);
        const data = await response.json();
        console.log(data);
        return data;
    }


)