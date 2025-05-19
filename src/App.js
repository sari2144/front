// בסד
import { DayView } from './components/DayView/dayView';
import MonthView from './components/calendar/MonthView';
import { Menue } from './components/menue/menue';
import CurrentTreatment from './components/treatment/current-treatment';
import HoverRating from './components/try';
import DashboardLayoutBasic from './components/view';
import { Routing } from './routes/routesApp';


function App() {
  return (
    <div >
      <Menue></Menue>
      <HoverRating/>
      {/* <DashboardLayoutBasic window={true}/> */}
      {/* <CurrentTreatment></CurrentTreatment> */}
     <Routing/>
    </div>
  );
}

export default App;
