//בס"ד

import { createSlice } from "@reduxjs/toolkit"
import { getPatientsThunk } from "./getPatientsThunk"
import { getPatientByIdThunk } from "./getPatientByIdThunk"
import { getAllDataThunk } from "../allDataSlice/getAllDataThunk"

const INITIAL_STATE = {
  patientsList: [],
  currentPatient: {}
}

export const PatientSlice = createSlice({
  name: 'PatientSlice',
  initialState: INITIAL_STATE,
  reducers: {
    setPatientsList: (state, action) => {
      state.patientsList = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getPatientsThunk.fulfilled, (state, action) => {
      state.patientsList = action.payload
    })

    builder.addCase(getPatientByIdThunk.fulfilled, (state, action) => {
      state.currentPatient = action.payload
    })


    builder.addCase(getAllDataThunk.fulfilled, (state, action) => {
      debugger
      state.patientsList = action.payload.patients
    })
  }
})