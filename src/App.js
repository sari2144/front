// בסד
import { DayView } from './components/DayView/dayView';
import MonthView from './components/calendar/MonthView';
import { Menue } from './components/menue/menue';
import HoverRating from './components/try';
import DashboardLayoutBasic from './components/view';
import { Routing } from './routes/routesApp';


function App() {
  return (
    <div >
      <Menue></Menue>
      <HoverRating/>
      {/* <DashboardLayoutBasic window={true}/> */}
     <Routing/>
    </div>
  );
}

export default App;
