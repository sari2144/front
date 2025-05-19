// בס"ד
import { combineSlices } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { QueuesSlice } from "./slices/queueSlice/queueSlice";
import { PatientSlice } from "./slices/patientSlice/patientSlice"
import { ClinicSlice } from "./slices/clinicSlice/clinicSlice";
import { DoctorSlice } from "./slices/doctorSlice/doctorSlice";
import { AllDataSlice } from "./slices/allDataSlice/allDataSlice";
import { WorkingTimeSlice } from "./slices/workingTimeSlice/workingTimeSlice";
import { ArchiveSlice } from "./slices/archiveSlice/archiveSlice";

const reducer = combineSlices(QueuesSlice , PatientSlice , ClinicSlice , DoctorSlice , AllDataSlice ,WorkingTimeSlice , ArchiveSlice);

export const STORE = configureStore({
    reducer: reducer
});