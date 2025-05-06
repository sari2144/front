
// בס"ד

import { createSlice } from "@reduxjs/toolkit";
import { getQueuesThunk } from "./getQueueThunk";
import { SearchAvialableQueuesThunk } from "./SearchAvialableQueuesThunk";
import { getAllStartAQueuesThunk } from "./getAllStartAvialableQueue";
// import { determineQueue } from "./determineQueue";
import { updateQueueThunk } from "./updateQueueThunk";
import { getAllDataThunk } from "../allDataSlice/getAllDataThunk";
import { getQueuesDataThunk } from "../allDataSlice/getQueuesDataThunk";




const INITIAL_STATE = {

    listOfQueues: [],
    listOfSearchedQueues: [],
    // listTerminideQueues:[],
    listStartAQueue: [],
    currentQueue: {}
}

export const QueuesSlice = createSlice({
    name: 'QueuesSlice',
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentQueue: (state, action) => {
            state.currentQueue = action.payload
        },

        setListOfQueues: (state, action) => {
            state.listOfQueues = action.payload
        },

        setListStartAQueue: (state, action) => {
            state.listStartAQueue = action.payload
        }

    },
    extraReducers: (builder) => {

        builder.addCase(getQueuesThunk.fulfilled, (state, action) => {
            debugger
            state.listOfQueues = action.payload
        })

        builder.addCase(SearchAvialableQueuesThunk.fulfilled, (state, action) => {
            debugger
            state.listOfSearchedQueues = action.payload
        })

        builder.addCase(getAllStartAQueuesThunk.fulfilled, (state, action) => {
            state.listStartAQueue = action.payload
        })

        builder.addCase(updateQueueThunk.fulfilled, (state, action) => {

        })

        builder.addCase(getAllDataThunk.fulfilled, (state, action) => {
            debugger
            state.listOfQueues = action.payload.queues
            state.listStartAQueue = action.payload.avialableQueues
        })

        builder.addCase(getQueuesDataThunk.fulfilled, (state, action) => {
            debugger
            state.listOfQueues = action.payload.queues
            state.listStartAQueue = action.payload.avialableQueues
        })
    }


})

