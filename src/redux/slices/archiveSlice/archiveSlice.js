//בס"ד

import { createSlice } from "@reduxjs/toolkit"
import {getAllArchiveThunk} from './getAllArchivesThunk'

const INITIAL_STATE = {
  archiveList: []
}

export const ArchiveSlice = createSlice({
  name: 'ArchiveSlice',
  initialState: INITIAL_STATE,
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder.addCase(getAllArchiveThunk.fulfilled, (state, action) => {
      state.archiveList = action.payload
    })

  }
})