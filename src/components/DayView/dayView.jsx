// בס"ד
import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';
import { useSelector } from 'react-redux'
import './dayView.css'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllStartAQueuesThunk } from '../../redux/slices/queueSlice/getAllStartAvialableQueue'
import { useNavigate } from 'react-router-dom';
import { deleteDetermineQThunk } from '../../redux/slices/queueSlice/deleteDetermineQThunk';
import { QueuesSlice } from '../../redux/slices/queueSlice/queueSlice'
import { RemindOffQueue } from "../remindOffQueue/remindOffQueue";
import { getQueuesDataThunk } from '../../redux/slices/allDataSlice/getQueuesDataThunk';
import { deleteFullAq } from '../../redux/slices/queueSlice/deleteFullAqThunk';
export const DayView = (props) => {
    const hours = [
        { hour: 0, hourString: "00:00" },
        { hour: 1, hourString: "01:00" },
        { hour: 2, hourString: "02:00" },
        { hour: 3, hourString: "03:00" },
        { hour: 4, hourString: "04:00" },
        { hour: 5, hourString: "05:00" },
        { hour: 6, hourString: "06:00" },
        { hour: 7, hourString: "07:00" },
        { hour: 8, hourString: "08:00" },
        { hour: 9, hourString: "09:00" },
        { hour: 10, hourString: "10:00" },
        { hour: 11, hourString: "11:00" },
        { hour: 12, hourString: "12:00" },
        { hour: 13, hourString: "13:00" },
        { hour: 14, hourString: "14:00" },
        { hour: 15, hourString: "15:00" },
        { hour: 16, hourString: "16:00" },
        { hour: 17, hourString: "17:00" },
        { hour: 18, hourString: "18:00" },
        { hour: 19, hourString: "19:00" },
        { hour: 20, hourString: "20:00" },
        { hour: 21, hourString: "21:00" },
        { hour: 22, hourString: "22:00" },
        { hour: 23, hourString: "23:00" }]

    const { date, setDayDate, monthName, setMonthName } = props
    const daysAtHebrew = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'שבת']
    const aQ = useSelector(state => state.QueuesSlice.listStartAQueue)
    const fixedQueues = useSelector(state => state.QueuesSlice.listOfQueues)
    const allPatients = useSelector(state => state.PatientSlice.patientsList)
    const queuesLists = useSelector(state => state.AllDataSlice.queuesLists)
    const dispatch = useDispatch()
    const navi = useNavigate()
    const [aqToday, setAqToday] = useState([])
    const [fqToday, setFqToday] = useState([])
    const [qToCancel, setQToCancel] = useState({})
    const [backToAvialableFlag, setBackToAvialableFlag] = useState(true)
    const [cancelConditionesFlag, setCancelConditionesFlag] = useState(false)
    const [remindQueueFlag, setRemindQueueFlag] = useState(false)
    const [qToRemind , setQToRemind] = useState({})

    let qType = 'o'
    useEffect(() => {
        debugger
        setAqToday(aQ?.filter(aq => new Date(aq.queue.date).toLocaleDateString() == date.toLocaleDateString()))
        var fqt = []
        // setFqToday(fixedQueues.filter(fq => new Date(fq.date).toLocaleDateString() == date.toLocaleDateString()))
        for (let i = 0; i < fixedQueues?.length; i++) {
            let d1 = new Date(fixedQueues[i].date)
            d1.setDate(d1.getDate())
            let str1 = d1.toLocaleDateString()
            let str2 = date.toLocaleDateString()
            if (str1 == str2)
                fqt.push(fixedQueues[i])
        }
        setFqToday(fqt)
    }, [aQ, date])

    const cancel = () => {
        setCancelConditionesFlag(true)
        setBackToAvialableFlag(true)
    }


    console.log(fixedQueues, 'oooooo');
    const add = (q) => {
        debugger
      dispatch(QueuesSlice.actions.setCurrentQueue(q))

        navi('/addQueue/' + qType)
    }

    const finalCancelQ = async () => {
        debugger
        let d = new Date(qToCancel.date)
        d.setDate(d.getDate() + 1)
        let qCancel = { ...qToCancel, date: d }
        let r = await dispatch(deleteDetermineQThunk({ q: qCancel, backToAvialable: backToAvialableFlag }))
       let m = await dispatch(getQueuesDataThunk())
        setCancelConditionesFlag(false)
        

        }

        const removeFullAq = (q) => {
            
            debugger
            var dd = new Date(q.date)
            let month = String(dd?.getMonth() + 1).padStart(2, '0')
            let day = String(dd?.getDate()).padStart(2, '0')
            let year = dd?.getFullYear()
            var d = month + '-' + day + '-' + year
        //    var d = dd?.getDate() + '-' + dd?.getMonth() + '-' + dd?.getFullYear() 
            dispatch(deleteFullAq({startH : q.hour , startM : q.minute , date : d}))
        }

        // useEffect(() => {
        //     if(queuesLists.queues){
        //         dispatch(QueuesSlice.actions.setListOfQueues(queuesLists.queues))
        //         dispatch(QueuesSlice.actions.setListStartAQueue(queuesLists.avialableQueues))
        //     }
        // },[queuesLists])
    return <dialog open className='dayView'>

        <h1 className='h'>{monthName} {date.getFullYear()}</h1>
        <p id='p'>
            <button className='btn' onClick={() => { setDayDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)) }}>◀</button>
            <button className='btn' onClick={() => { setDayDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)) }}>▶</button>
        </p>

        {<dialog open={cancelConditionesFlag} className='cancelDialog'>
            ?האם אתה בטוח שברצונך לבטל את התור <input checked = {backToAvialableFlag} type="checkbox" onChange={() => setBackToAvialableFlag(!backToAvialableFlag)} />?האם לאפשר ללקוח אחר לקבוע את התור הזה
            <button onClick={() => setCancelConditionesFlag(false)}>no</button><button onClick={() => { finalCancelQ() }}>yes</button>
        </dialog>}

        <dialog open={remindQueueFlag} className='remindQueueDialog'>
            <RemindOffQueue queueToRemind={qToRemind} setFlagOpen = {setRemindQueueFlag}></RemindOffQueue>
        </dialog>

        <section className='dayHead'>
            <h2 className='dayNum'>יום {daysAtHebrew[(date.getDay())]}</h2>
            <h2 className='dayNum'>{date.getDate()}</h2>

        </section>
        <header className='day'>
            {hours && hours?.map(h => {
                {
                    var coll = aqToday?.find(q => q.queue.hour == h.hour)
                    var col = coll != null ? 'salmon' : 'white'
                    var aq = aqToday?.find(q => q.queue.hour == h.hour)
                    var fixedQ = fqToday?.find(fq => fq.startHour == h.hour)
                    if (fixedQ)
                        col = 'yellow'
                }
                return <section className='rowHour'
                    style={{ backgroundColor: col }}>
                    {fixedQ &&
                        <>
                            <button id='oooo' onClick={() => { cancel(); setQToCancel(fixedQ) }}>לביטול התור</button>
                            {fixedQ.isReminded == 1 ? <section>✅</section> : <button onClick={()=>{setQToRemind(fixedQ);setRemindQueueFlag(true);}}>❌</button>}
                        </>
                    }
                    {
                        aq?.queue != undefined ?
                            <>
                                {aq?.queue != undefined  && <button onClick={() => {removeFullAq(aq?.queue)}} className='toAddQ' title='מחיקת תור זמין'>🗑</button>}
                                {aq?.queue != undefined && aq?.flagWoman == true && <button onClick={() => { qType = 'w'; add(aq.queue) }} className='toAddQ' title='תור לאישה '><Face3OutlinedIcon></Face3OutlinedIcon></button>}
                                {aq?.queue != undefined && aq?.flagDouble == true && <button onClick={() => { qType = 'd'; add(aq.queue) }} className='toAddQ' title='תור כפול'>💢</button>}
                                <button className='toAddQ' onClick={() => add(aq.queue)}>+</button>
                            </> : ""}
                    {fixedQ?.id != undefined ?
                        <>
                            <p>{allPatients?.find(p => p.id == fixedQ.idPatient)?.firstName} {allPatients.find(p => p.id == fixedQ.idPatient)?.lastName} {fixedQ.description} {fixedQ.startHour}:{fixedQ.startMinute}-{fixedQ.endHour}:{fixedQ.endMinute}</p>
                        </>
                        : ""}

                    <p className='hour' >{h.hourString}</p>
                </section>
            })}
        </header>
        <button onClick={() => setMonthName("")}>close</button>
    </dialog>
}

export default DayView;
