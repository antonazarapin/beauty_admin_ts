/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

function HistoryList() {
	const {
		getAppointments,
		allAppointments,
		appointmentLoadingStatus
	} = useContext(AppointmentContext);

	useEffect(() => {
		getAppointments()
	}, []);

	if (appointmentLoadingStatus === 'loading') {
		return <Spinner />
	} else if (appointmentLoadingStatus === 'error') {
		return (
			<>
				<Error />

				<button className="schedule__reload" onClick={getAppointments}>
					Try to reload
				</button>
			</>
		)
	}

	return (
		<>
			{allAppointments
				.sort(function (a, b) {
					if (a.date > b.date) {
						return 1;
					}
					if (a.date < b.date) {
						return -1;
					}
					return 0;
				})
				.map((item) => {
					return <AppointmentItem
						{...item}
						key={item.id}
						openModal={() => 0}
						getAppointments={getAppointments}
					/>
				})}
		</>
	);
}

export default HistoryList;
