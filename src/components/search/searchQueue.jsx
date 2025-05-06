// בס"ד

import { useEffect, useState } from 'react'
import '../search/searchQueue.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { SearchAvialableQueuesThunk } from '../../redux/slices/queueSlice/SearchAvialableQueuesThunk'
import { getAllDoctorThunk } from '../../redux/slices/doctorSlice/getAllDoctorsThunk'
import { getAllClinicThunk } from '../../redux/slices/clinicSlice/getAllClinicsThunk'
import { useNavigate } from 'react-router-dom'
import { QueuesSlice } from '../../redux/slices/queueSlice/queueSlice'


export const SearchQueue = () => {

    const currentPatient = useSelector(state => state.PatientSlice.currentPatient)
    const arrSearch = useSelector(state => state.QueuesSlice.listOfSearchedQueues)
    const doctorsList = useSelector(state => state.DoctorSlice.doctorsList)
    const clinicsList = useSelector(state => state.ClinicSlice.listOfClinics)
    const [searchDetails, setSearchDetails] = useState({ id: currentPatient.id, dayWeek: ' ', doctorName: ' ', city: ' ', minHour: -1, maxHour: -1, date: '2020-1-1', isDouble: false })
    const dispatch = useDispatch()
    const navi = useNavigate()

    const daysAtHebrew = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי']

    useEffect(() => {
        if(!doctorsList.length)
            dispatch(getAllDoctorThunk())
    }, [])
    useEffect(() => {
        if(!clinicsList.length)
            dispatch(getAllClinicThunk())
    }, [doctorsList])
    const res = () => {
        // if(searchDetails.date != ' ')

        dispatch(SearchAvialableQueuesThunk(searchDetails))
    }

    const determineQ = (q) => {
        var qType = 'o'
        if(searchDetails.isDouble)
            qType = 'd'
        else if(currentPatient.gender == 'female')
            qType = 'w'
        dispatch(QueuesSlice.actions.setCurrentQueue(q))
        navi('/addQueue/' + qType)
    }
    return <div>
        <input type="text" placeholder="למטפל" className="searInput" onChange={e => setSearchDetails({ ...searchDetails, doctorName: e.target.value })} />
         
        <select className='searInput' name="sel" onChange={e => setSearchDetails({...searchDetails,dayWeek:e.target.value}) }> 
            <option value=" "></option>
            <option value="Sunday">ראשון</option>
            <option value="Monday">שני</option>
            <option value="Tuesday">שלישי</option>
            <option value="Wednesday">רביעי</option>
            <option value="Thursday">חמישי</option>
            <option value="Friday">שישי</option>
        </select>
        <input type="date" placeholder="החל מתאריך" className="searInput" onChange={e => setSearchDetails({ ...searchDetails, date: e.target.value })} />
        <input type="number" placeholder="החל משעה" className="searInput" onChange={e => setSearchDetails({ ...searchDetails, minHour: e.target.value })} />
        <input type="number" placeholder="עד לשעה" className="searInput" onChange={e => setSearchDetails({ ...searchDetails, maxHour: e.target.value })} />
        <select name="" className='searInput' onChange={e => setSearchDetails({ ...searchDetails, city: e.target.value })}>
            <option value=" "></option>
            <option value="Ashdod">אשדוד </option>
            <option value="Jerusalem">ירושלים </option>
        </select>
        <input type="text" placeholder="תור כפול" className="searInput" onChange={e => setSearchDetails({ ...searchDetails, isDouble: e.target.value })} />

        <button onClick={res}>result</button>
        <table>

            <tr>
                <th className='tHead'>קוד </th>
                <th className='tHead'>מטפל </th>
                <th className='tHead'>תאריך  </th>
                <th className='tHead'>יום  </th>
                <th className='tHead'>שעה </th>
                <th className='tHead'>קליניקה </th>
                <th className='tHead'>לקביעת התור </th>
            </tr>
            <tr>
                {arrSearch.length ? arrSearch.map(s => {
                    return (<tr>
                        <td>{s.id}</td>
                        <td>
                            {doctorsList.find(d => d.id == s.idDoctor)?.firstName} {doctorsList.find(d => d.id == s.idDoctor)?.lastName}</td>
                        <td>{new Date(s.date).toLocaleDateString()}</td>
                        <td>{daysAtHebrew[new Date(s.date).getDay()]}</td>
                        <td>{s.hour}:{s.minute == 0 ? '00' : s.minute}</td>
                        <td>{clinicsList.find(c => c.id == s.idClinic)?.city}</td>
                        <td><button onClick={()=>determineQ(s)}>👇</button></td>
                    </tr>)
                }) :<h2 >אין תורים זמינים בתנאים שביקשת</h2>}
            </tr>



        </table>

    </div>
}