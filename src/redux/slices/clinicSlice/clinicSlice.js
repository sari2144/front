import { createSlice } from "@reduxjs/toolkit"
import { getClinicByIdThunk } from "./getClinicById"
import { getAllClinicThunk } from "./getAllClinicsThunk"
import { getAllDataThunk } from "../allDataSlice/getAllDataThunk"

const INITIAL_STATE = {
  currentClinic: {},
  listOfClinics: []
}

export const ClinicSlice = createSlice({
  name: 'ClinicSlice',
  initialState: INITIAL_STATE,
  reducers: {
    setListOfClinics: (state, action) => {
      state.listOfClinics = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getClinicByIdThunk.fulfilled, (state, action) => {
      debugger
      state.currentClinic = action.payload
    })
    builder.addCase(getAllClinicThunk.fulfilled, (state, action) => {
      debugger
      state.listOfClinics = action.payload
    })

    builder.addCase(getAllDataThunk.fulfilled, (state, action) => {
      debugger
      state.listOfClinics = action.payload.clinics
    })
  }
})