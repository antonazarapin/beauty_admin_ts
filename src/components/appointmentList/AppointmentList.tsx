import { useContext, useEffect } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
	const { allAppointmnets, getAppointments } = useContext(AppointmentContext);

	useEffect(() => {
		getAppointments()
	}, [])

	return (
		<>
			{allAppointmnets[0] ? allAppointmnets[0].name : console.log('dont have')}
			<AppointmentItem />
			<AppointmentItem />
			<AppointmentItem />
			<AppointmentItem />
		</>
	);
}

export default AppointmentList;
