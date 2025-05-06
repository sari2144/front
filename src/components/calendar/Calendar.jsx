import React, { useEffect, useState } from 'react';
import MonthView from './MonthView';
import WeekView from './WeekView';
import { useSelector } from 'react-redux';
import './calendar.css'
import { DayView } from '../DayView/dayView';
import { useDispatch } from 'react-redux';
import { getAllStartAQueuesThunk } from '../../redux/slices/queueSlice/getAllStartAvialableQueue';
import { getQueuesThunk } from '../../redux/slices/queueSlice/getQueueThunk';
import { getPatientsThunk } from "../../redux/slices/patientSlice/getPatientsThunk"
import { getAllDataThunk } from '../../redux/slices/allDataSlice/getAllDataThunk';
import { PatientSlice } from '../../redux/slices/patientSlice/patientSlice';
import { DoctorSlice } from '../../redux/slices/doctorSlice/doctorSlice';
import { QueuesSlice } from '../../redux/slices/queueSlice/queueSlice';
import { ClinicSlice } from '../../redux/slices/clinicSlice/clinicSlice';
// import { AllDataSlice } from '../../redux/slices/allDataSlice/allDataSlice';
export const Calendar = () => {
    const currentPatient = useSelector(state => state.PatientSlice.currentPatient)
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('month'); // 'month' or 'week'
    const [dayDate ,setDayDate] = useState(new Date(2001 , 2 , 24))
    const patients = useSelector(state => state.PatientSlice.patientsList)
    const queues = useSelector(state => state.QueuesSlice.listOfQueues)
    const allData = useSelector(state => state.AllDataSlice.allLists)
    const [monthName , setMonthName]=  useState("")
    const dispatch = useDispatch()

    // useEffect(() => {
    //     debugger
    //     if(patients.length > 0)
    //         dispatch(getQueuesThunk())
    //     else;
            
    // }, [patients])

    useEffect(() => {
        debugger
        if(!allData.queues)
        dispatch(getAllDataThunk())
    }, [])

    // useEffect(() => {
    //     debugger
    //     if(allData){
    //         dispatch(PatientSlice.actions.setPatientsList(allData.patients))
    //         dispatch(DoctorSlice.actions.setDoctorsList(allData.doctors))
    //         dispatch(QueuesSlice.actions.setListOfQueues(allData.queues))
    //         dispatch(QueuesSlice.actions.setListStartAQueue(allData.avialableQueues))
    //         dispatch(ClinicSlice.actions.setListOfClinics(allData.clinics))
         
    //     }
            
    // },[allData])


    // useEffect(() => {
    //     debugger
    //     if(queues.length > 0)
    //     dispatch(getAllStartAQueuesThunk())
    // }, [queues])

    const toggleView = () => {
        setView(view === 'month' ? 'week' : 'month');
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const goToPrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextWeek = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
    };

    const goToPrevWeek = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
    };

    return (
        <div id='calen'>

            {monthName != "" && <DayView date = {dayDate} setDayDate = {setDayDate} monthName = {monthName} setMonthName = {setMonthName}></DayView>}
            <h2>שלום {currentPatient.firstName}</h2>
            <button onClick={toggleView}>{view === 'month' ? 'מעבר לתצוגה שבועית' : 'מעבר לתצוגה חודשית'}</button>
            {view === 'month' ? (
                <>
                    <button onClick={goToPrevMonth}>▶חודש הקודם</button>
                    <button onClick={goToNextMonth}>חודש הבא◀</button>
                    <MonthView currentDate={currentDate}  setDayDate={setDayDate} setMonthName = {setMonthName}/>
                </>
            ) : (
                <>
                    <button onClick={goToPrevWeek}>▶שבוע הקודם</button>
                    <button onClick={goToNextWeek}>שבוע הבא◀</button>
                    <WeekView currentDate={currentDate} />
                </>
            )}
            
        </div>
    );
};

export default Calendar;
