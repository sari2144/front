// בס"ד

import { DayView } from "../DayView/dayView";

const MonthView = ({ currentDate , setDayDate , setMonthName}) => {
  const renderMonthDays = () => {
    // Get the first day of the month
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayWeekday = firstDayOfMonth.getDay();

    // Calculate the number of days in the month
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    const weekDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

    // Create calendar cells array
    const calendarCells = [];

    // Add weekday headers
    weekDays.forEach(day => {
      calendarCells.push(
        <div key={`header-${day}`} style={{

          backgroundColor: '#4CAF50',
          color: 'white',
          padding: "10px",
          textAlign: 'center',
          fontWeight: 'bold',
          borderRadius: '5px'
        }}>
          {day}
        </div>
      );
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      calendarCells.push(
        <div key={`empty-${i}`} style={{
          border: "1px solid #eee",
          padding: "10px",
          textAlign: 'center',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9'
        }}></div>
      );
    }

    // Add cells for each day of the month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      calendarCells.push(
        <div onClick={() => {setDayDate(date); setMonthName(monthNames[date.getMonth()])}}
          key={`day-${day}`} style={{
          border: "1px solid #ccc",
          padding: "10px",
          textAlign: 'center',
          borderRadius: '5px',
          backgroundColor: isToday ? '#1c89' : 'white'
        }}>
          {day}
        </div>
      );
    }

    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "5px"
      }}>
        {calendarCells}
      </div>
    );
  };

  const monthNames = [
    'ינואר', 'פבואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];

  return (
    <div style={{
      padding: "20px",
      border: "3px solid pink",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: 'center' }}>
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h2>
      {renderMonthDays()}
    </div>
  );
};

export default MonthView;
