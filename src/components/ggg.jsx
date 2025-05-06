// import { useDispatch } from "react-redux"
// import { useSelector } from "react-redux"
// import { getAvialableQueuesThunk } from "../redux/slices/queueSlice/getAvialableQueuesThunk"
// import { getStartAvialableQueuesThunk } from "../redux/slices/queueSlice/getStartAvialableQueueThunk"
// import { getPatientsThunk } from "../redux/slices/patientSlice/getPatientsThunk"
// import { getQueuesThunk } from "../redux/slices/queueSlice/getQueueThunk"
// import { useState } from "react"
// import { getPatientByIdThunk } from "../redux/slices/patientSlice/getPatientByIdThunk"


// export const Gggg = () => {

//     const queues = useSelector(state=>state.QueuesSlice.listOfQueues)
//     const searchedQueues = useSelector(state => state.QueuesSlice.listOfSearchedQueues)
//     const patients = useSelector(state => state.PatientSlice.patientsList)
//     const terminideQueues = useSelector(state => state.QueuesSlice.listTerminideQueues)
//     const currentPatient = useSelector(state => state.PatientSlice.currentPatient)

//     const dispatch = useDispatch()

//      const [id , setId] = useState()

//     const avialableQueues = async () => {
//         debugger
//         await dispatch(getAvialableQueuesThunk())
//     }

//     const searchQueue = async() => {
//         debugger

//         let id = "035474500"
//         let dayWeek = "Sunday"
//         let doctorName = " "
//         let city = " "
//         let minHour = -1
//         let maxHour = -1
//         let date = '2020-1-1'
//         let isDouble = false

//        let g =  await dispatch(getStartAvialableQueuesThunk({id , dayWeek , doctorName , city , minHour , maxHour , date , isDouble}))
//        console.log(g);
//     }

//     const getPatients = async() => {
//         debugger
//         await dispatch(getPatientsThunk())
//     }

//     const getTerminideQueues = async() => {
//         debugger
//         await dispatch(getQueuesThunk())
//     }

//     const getPatientById = async()=>{
//         await dispatch(getPatientByIdThunk(id))
//     }

//     return <div>
//         hellow
//         <button onClick={avialableQueues} style={{width:'50px' ,height:'50px'}}>get all avialable queues</button>
//         <button onClick={searchQueue}>search queues</button>
//         <button onClick={getPatients}>get patients</button>
//         <button onClick={getTerminideQueues}>determinide queues</button>
//         <label>id patient</label>
//         <input onChange={(e) => setId(e.target.value)}></input>
//         <button onClick={getPatientById}>get patient by id</button>
//         {queues && queues.length > 0 && queues.map(q =>{ return( <tr><td>{q.id}</td><td>{q.date}</td></tr>)})}
//         {searchedQueues && searchedQueues.map(q => {return( <mark key={q.id}>kk {q.date} {q.hour} {q.minute}</mark>)})}
//         {patients && patients.map(p => {return(<h3 key={p.id}>{p.firstName}  {p.lastName}</h3>)})}
//         {terminideQueues && terminideQueues.map(q => {return(<h2 key={q.id}>{q.idPatient}</h2>)})}
//         {currentPatient && <h1>{currentPatient.id} {currentPatient.firstName} {currentPatient.lastName}</h1>}
//     </div>
// }

