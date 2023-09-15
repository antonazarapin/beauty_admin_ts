/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, useCallback } from "react";

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

	const handleOpenModal = useCallback((id: number) => {
		setIsOpen(true);
		selectId(id);
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
					openModal={handleOpenModal}
					getActiveAppointments={getActiveAppointments}
				/>
			})}

			<CancelModal
				handleClose={setIsOpen}
				selectedId={selectedId}
				isOpen={isOpen}
			/>
		</>
	);
}

export default AppointmentList;
