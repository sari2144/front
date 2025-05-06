import { useSelector } from 'react-redux'
import './remindOffQueue.css'
import { click } from '@testing-library/user-event/dist/click'
import { useDispatch } from 'react-redux'
import { updateQueueThunk } from '../../redux/slices/queueSlice/updateQueueThunk'
import { QueuesSlice } from '../../redux/slices/queueSlice/queueSlice'

export const RemindOffQueue = (props) => {
    const { queueToRemind, setFlagOpen } = props

    const dispatch = useDispatch()

    const patients = useSelector(state => state.PatientSlice.patientsList)
    const clinics = useSelector(state => state.ClinicSlice.listOfClinics)
    const doctors = useSelector(state => state.DoctorSlice.doctorsList)
    const queuesLists = useSelector(state => state.AllDataSlice.queuesLists)

    const getClinicAdress = () => {
        debugger
        let adress = ""
        let clinic = clinics?.find(c => c.id == queueToRemind.idClinic)
        if (clinic) {
            adress += clinic.street + " "
            adress += clinic.streetNumber + " "
            adress += clinic.city
        }
        return adress
    }

    const getDoctorName = () => {
        let doctor = doctors?.find(d => d.id == queueToRemind.idDoctor)
        if (doctor) {
            return doctor.firstName + " " + doctor.lastName
        }
    }

    const getCurrentPatient = () => {
        let currentPatient = patients?.find(p => p.id == queueToRemind.idPatient)
        return currentPatient
    }

    const updateTheQToBeReminded = async () => {
        let q = { ...queueToRemind, isReminded: 1 }
        let q1 = q
        let d = new Date(q.date)
        d.setDate(d.getDate() + 1)
        q = { ...q, date: d }
        let a = await dispatch(updateQueueThunk(q))
         let listQueues = QueuesSlice.getInitialState().listOfQueues.filter(qq => qq.id != q.id)
         listQueues.push(q1)
         dispatch(QueuesSlice.actions.setListOfQueues(listQueues))
         if (setFlagOpen != null)
            setFlagOpen(false)
        
    }

    return <div className='remindComponenet'>
        {queueToRemind &&
            <>
                <h1>תזכור {getCurrentPatient()?.firstName} {getCurrentPatient()?.lastName} לתור קרוב</h1>
                <label>שם לקוח</label>
                <p>{getCurrentPatient()?.firstName} {getCurrentPatient()?.lastName}</p>
                <label>תאריך התור</label>
                <p>{queueToRemind.date}</p>
                <label>בין השעות</label>
                <p>{queueToRemind.startHour}:{queueToRemind.startMinute == 0 ? '00' : queueToRemind.startMinute}-{queueToRemind.endHour}:{queueToRemind.endMinute == 0 ? '00' : queueToRemind.endMinute}</p>
                <label>כתובת הקליניקה</label>
                <p>{getClinicAdress()}</p>
                <label>למטפל</label>
                <p>{getDoctorName()}</p>
                <label>מספר פלאפון של הלקוח</label>
                <p>{getCurrentPatient()?.phone}</p>
                <button onClick={updateTheQToBeReminded}>לאישור התזכורת</button>
            </>}
    </div>
}