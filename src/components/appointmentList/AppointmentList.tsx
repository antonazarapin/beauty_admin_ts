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
		appointmentLoadingStatus
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

	if (appointmentLoadingStatus === 'loading') {
		return <Spinner />
	} else if (appointmentLoadingStatus === 'error') {
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
			{activeAppointments
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
						openModal={handleOpenModal}
						getAppointments={getActiveAppointments}
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
