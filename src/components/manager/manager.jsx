// בס"ד
import { useDispatch, useSelector } from 'react-redux'
import './manager.css'
import { useEffect, useState } from 'react'
import { getAllWorkingTimeThunk } from '../../redux/slices/workingTimeSlice/getAllWorkingTimesThunk'
import { updateWorkingTimeThunk } from '../../redux/slices/workingTimeSlice/updateWorkingTimeThunk'

export const Manager = () => {

    const workingTimes = useSelector(state => state.WorkingTimeSlice.workingTimeList)
    const dispatch = useDispatch()
    const [flagToEdit, setFlagToEdit] = useState(false)
    const [wTupdate, setWTupdate] = useState({ id: 0, dayWeek: ' ', startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, idClinic: 1 })

    useEffect(() => {
        if (!workingTimes?.length)
            dispatch(getAllWorkingTimeThunk())
    }, [])
    const updateWorkingTime = (w) => {
        debugger
        dispatch(updateWorkingTimeThunk(w))

    }

      
    
    return <div>

        <h1>שלום מנהל יקר</h1>
        {/* <button onClick={updateWorkingTime}>
            לשינוי שעות הפעילות</button> */}

        <table>
            <tr>
                <th> קוד</th>
                <th> יום</th>
                <th> שעת התחלה</th>
                <th> שעת סיום</th>
                <th> קליניקה</th>
                <th> לעריכה</th>

            </tr>
            {workingTimes && workingTimes?.map(w => {
                
                return (
                    <tr>
                        <td>{w.id}</td>
                        <td>{w.dayWeek}</td>
                        <td>{w.startHour}:{w.startMinute == 0 ? '00' : w.startMinute}</td>
                        <td>{w.endHour}:{w.endMinute == 0 ? '00' : w.endMinute}</td>
                        <td>{w.idClinic}</td>
                        <td><button onClick={() => {setFlagToEdit(true) ; setWTupdate(w)}}>edit ✏</button></td>

                    </tr>
                )
            })}
            {flagToEdit ? <>
             <h3>עריכה</h3>
            <input type="number" value={wTupdate.id} onChange={e => setWTupdate({...wTupdate,id:e.target.value})}/>
            <input type="number" value={wTupdate.startHour} onChange={e => setWTupdate({...wTupdate,startHour:e.target.value})}/>
            <input type="number" value={wTupdate.startMinute} onChange={e => setWTupdate({...wTupdate,startMinute:e.target.value})}/>
            <input type="number" value={wTupdate.endHour} onChange={e => setWTupdate({...wTupdate,endHour:e.target.value})}/>
            <input type="number" value={wTupdate.endMinute} onChange={e => setWTupdate({...wTupdate,endMinute:e.target.value})}/>
            <input type="number" value={wTupdate.idClinic} onChange={e => setWTupdate({...wTupdate,idClinic:e.target.value})}/>
            <button onClick={() => updateWorkingTime(wTupdate)}>לשמירה🔴🟠🟡🟢🔵🟣🟤⚫</button>
            </>
            : ''}
           
        </table>



    </div>
}