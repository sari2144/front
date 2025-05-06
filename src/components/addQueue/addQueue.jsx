// בס"ד

import { useSelector } from 'react-redux'
import './addQueue.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getClinicByIdThunk } from '../../redux/slices/clinicSlice/getClinicById'
import { useEffect, useState } from 'react'
import { getDoctorByIdThunk } from '../../redux/slices/doctorSlice/getDoctorByIdThunk'
import { determineQueue } from '../../redux/slices/queueSlice/determineQueue'
import { getAllStartAQueuesThunk } from '../../redux/slices/queueSlice/getAllStartAvialableQueue'
import {getQueuesThunk} from '../../redux/slices/queueSlice/getQueueThunk'
import { AllDataSlice} from '../../redux/slices/allDataSlice/allDataSlice'
import { QueuesSlice } from '../../redux/slices/queueSlice/queueSlice'
import { getQueuesDataThunk } from '../../redux/slices/allDataSlice/getQueuesDataThunk'
export const AddQueue = () => {
    const currentPatient = useSelector(state => state.PatientSlice.currentPatient)
    const clinic = useSelector(state => state.ClinicSlice.currentClinic)
    const doctor = useSelector(state => state.DoctorSlice.currentDoctor)
    const currentQ = useSelector(state => state.QueuesSlice.currentQueue)
    const queuesLists = useSelector(state => state.AllDataSlice.queuesLists)
    const param = useParams()
    const navi = useNavigate()
    const dispatch = useDispatch()
    const x =currentQ
    const qType = param.qType
    console.log('json-----',x);
    console.log(currentPatient.firstName,'-------',currentPatient.lastName);   
    {var dd = new Date(x.date).toLocaleDateString()
    var dd2 = new Date(dd)
    dd2.setDate(dd2.getDate() + 1)
    var dd3 = dd2
    var endH
    var endM
    if(qType == 'o'){
        endH = x.hour + 1
        endM = x.minute
    }
    else if(qType == 'd'){
        endH = x.hour + 2
        endM = x.minute
    }
    else{
        endH = x.hour + 1
        endM = x.minute + 10
        if(endM == 60){
            endH++
            endM = 0
        }
    }
    }
    //const [description , setDescription] = useState()
    console.log(param,'[[[[[[[');
    console.log(endH,':',endM);
    const [queue,setQueue] = useState({id:0,idPatient:currentPatient.id , idDoctor:x.idDoctor ,date:dd3 ,startHour:x.hour,startMinute:x.minute , endHour:endH, endMinute:endM, idClinic:clinic.id,description:''})
    useEffect(() => {
        debugger
        dispatch(getClinicByIdThunk(x.idClinic))
      
    }, [])
useEffect(()=>{
    debugger
   setQueue({...queue,idClinic:clinic.id}) 
   if(clinic!=null&&doctor.id==undefined){ 
      dispatch(getDoctorByIdThunk(x.idDoctor))
    }
},[clinic])
    const finish = async() => {
        debugger
        let a = await dispatch(determineQueue(queue))
        dispatch(getQueuesDataThunk())
        setTimeout(() => {
            navi('/ccc')
        }, 1500);
        if(a.payload == true)
            alert('התור נקבע בהצלחה🦋')
        else
            alert('קביעת התור נחלה כישלון🦁')
        
    }
    useEffect(()=>{
        if(queuesLists.queues){
            dispatch(QueuesSlice.actions.setListOfQueues(queuesLists.queues))
            dispatch(QueuesSlice.actions.setListStartAQueue(queuesLists.avialableQueues))
        }
    },[queuesLists])
    return <div className='addQueue'>
        <h1 className='addHead'>קביעת תור</h1>
        <h2 className='lll'>מספר זהות : <label>{currentPatient.id}</label></h2>
        
        <h2 className='lll'>שם לקוח : <label>{currentPatient.firstName + " " + currentPatient.lastName}</label></h2>
        
        <h2 className='lll'>תאריך : <label>{dd}</label></h2>
        
        <h2 className='lll'>שעה : <label>{x.hour}:{x.minute}</label></h2>
       
        <h2 className='lll'>כתובת הקליניקה : <label>{clinic.street} {clinic.streetNumber} {clinic.city}</label></h2>
       
        <h2 className='lll'>שם המטפל : <label>{doctor.id}  {doctor.firstName} {doctor.lastName}</label></h2>
        
        <h2 className='lll'>תאור סיבה : </h2>
        
        <select onChange={e => setQueue({...queue , description : e.target.value})}>
            <option value={"כאבי גב"}>כאבי גב</option>
            <option value={"בעיות עיכול"}>בעיות עיכול</option>
            <option>רגשי</option>
            <option>כאבי ראש</option>
            
        </select>
        <button onClick={finish}>🆗</button>
        </div>
}

