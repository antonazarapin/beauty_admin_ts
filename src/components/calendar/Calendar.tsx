import "./calendar.scss";
import "react-calendar/dist/Calendar.css";

import { Calendar as LibCalendar } from "react-calendar";
import { useContext } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function Calendar() {
	const { calendarDate, setDateAndFilter } = useContext(AppointmentContext);

	return (
		<div className="calendar">
			<LibCalendar
				value={calendarDate}
				onChange={(value) => setDateAndFilter(value)}
				selectRange
			/>
		</div>
	)

}

export default Calendar;
