// בס"ד
import { Route, Routes } from "react-router-dom"
import { Gggg } from "../components/ggg"
import { Login } from "../components/login/login"
import MonthView from "../components/calendar/MonthView"
import WeekView from "../components/calendar/WeekView"
import { Registration } from "../components/registration/registration"
// import { HomePage } from '../components/home/Home'
import { DayView } from "../components/DayView/dayView"
// import { Calendar} from '../components/calendar/Calendar'
import { AddQueue } from "../components/addQueue/addQueue"
import { SearchQueue } from "../components/search/searchQueue"
import { RemindOffQueue } from "../components/remindOffQueue/remindOffQueue"
import { Remind } from "../components/remind/remind"
import { Manager } from "../components/manager/manager"
import Calendar from "../components/calendar/Calendar"



export const Routing = () => {
    return <>
           
        <Routes > 
            <Route path="/" element={<Login/>}></Route>
            {/* <Route path="ggg" element={<Gggg/>}></Route> */}
            <Route path="mmm" element={<MonthView/>}></Route>
            <Route path="addQueue/:qType" element={<AddQueue/>}></Route>
            <Route path="www" element={<WeekView/>}></Route>
            {/* <Route path="ccc" element={<Calendar/>}></Route> */}
            <Route path="ccc" element={<Calendar/>}></Route> 
            <Route path="manager" element={<Manager/>}></Route>        
            <Route path="search" element={<SearchQueue/>}></Route>        
            <Route path="registration/:username/:password" element={<Registration/>}></Route>
            <Route path="login" element={<Login/>}></Route>
            <Route path="remind" element={<Remind/>}></Route>
            {/* <Route path="home" element={<HomePage/>}></Route> */}
        </Routes>
    </>
}