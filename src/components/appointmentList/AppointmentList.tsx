import { useContext, useEffect, useState } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";

function AppointmentList() {
	const {
		getActiveAppointments,
		activeAppointments,
		appointmentLoadindStatus
	} = useContext(AppointmentContext);

	const [isOpen, setIsOpen] = useState(false);
	const [selectedId, selectId] = useState(0);

	useEffect(() => {
		getActiveAppointments();
	}, [])

	if (appointmentLoadindStatus === 'loading') {
		return <Spinner />
	} else if (appointmentLoadindStatus === 'error') {
		return (
			<>
				<Error />

				<button className="schedule__reload" onClick={getActiveAppointments}>
					Try to reload
				</button>
			</>
		)
	}

	return (
		<>
			{activeAppointments.map((item) => {
				return <AppointmentItem
					{...item}
					key={item.id}
					openModal={setIsOpen}
					selectId={() => selectId(item.id)} />
			})}

			{isOpen ? <CancelModal handleClose={setIsOpen} selectedId={selectedId} /> : null}
		</>
	);
}

export default AppointmentList;
