// בס"ד
import { createSlice } from "@reduxjs/toolkit"
import { getDoctorByIdThunk } from "./getDoctorByIdThunk"
import { getAllDoctorThunk } from "./getAllDoctorsThunk"
import { getAllDataThunk } from "../allDataSlice/getAllDataThunk"

const INITIAL_STATE = {
  doctorsList: [],
  currentDoctor: {}
}

export const DoctorSlice = createSlice({
  name: 'DoctorSlice',
  initialState: INITIAL_STATE,
  reducers: {
    setDoctorsList: (state, action) => {
      state.doctorsList = action.payload
    }
  },

  extraReducers: (builder) => {

    builder.addCase(getDoctorByIdThunk.fulfilled, (state, action) => {
      state.currentDoctor = action.payload
    })

    builder.addCase(getAllDoctorThunk.fulfilled, (state, action) => {
      state.doctorsList = action.payload
    })


    builder.addCase(getAllDataThunk.fulfilled, (state, action) => {
      debugger
      state.doctorsList = action.payload.doctors
    })
  }
})
