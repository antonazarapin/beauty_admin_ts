/* eslint-disable react-hooks/exhaustive-deps */
import "./modal.scss";

import Portal from "../portal/portal";
import React, { useRef, useEffect, useState, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import useAppointmentService from "../../services/AppointmentServices";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";


interface IModalProps {
	handleClose: (state: boolean) => void,
	selectedId: number,
	isOpen: boolean
}

function CancelModal({ handleClose, selectedId, isOpen }: IModalProps) {
	const nodeRef = useRef<HTMLDivElement>(null);
	// используйте всегда максимально специфичный тип элемента

	const { cancelOneAppointment } = useAppointmentService();
	const { getActiveAppointments } = useContext(AppointmentContext);

	const [btnDisabled, setBtnDisabled] = useState<boolean>(false)
	const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);

	const handleCancelAppointment = (id: number) => {
		setBtnDisabled(true);
		cancelOneAppointment(id)
			.then(() => {
				setCancelStatus(true);
			})
			.catch(() => {
				setCancelStatus(false);
				setBtnDisabled(false);
			})
	}

	const closeModal = () => {
		handleClose(false);
		if (cancelStatus) {
			getActiveAppointments()
		}
	}

	const closeOnClickOutside = (event: React.MouseEvent) => {
		const modalWindow = document.querySelector('.modal');

		if (event.target === modalWindow) {
			// Закрыть модальное окно, если клик был сделан вне модального окна
			closeModal();
		}
	};

	const closeOnEscapeKey = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeModal();
			if (cancelStatus) {
				getActiveAppointments()
			}
		}
	}
	useEffect(() => {
		document.body.addEventListener('keydown', closeOnEscapeKey);

		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey);
		}
	}, [handleClose, cancelStatus])

	return (
		<Portal>
			<CSSTransition
				in={isOpen}
				timeout={{ enter: 500, exit: 500 }}
				unmountOnExit
				classNames='modal'
				nodeRef={nodeRef}
			>
				<div className="modal" ref={nodeRef} onClick={closeOnClickOutside}>
					<div className="modal__body">
						<span className="modal__title">
							Are you sure you want to delete the appointment?
						</span>
						<div className="modal__btns">
							<button
								className="modal__ok"
								disabled={btnDisabled}
								onClick={() => handleCancelAppointment(selectedId)}
							>
								Ok
							</button>
							<button
								className="modal__close"
								onClick={closeModal}
							>Close
							</button>
						</div>
						<div
							className="modal__status"
							style={cancelStatus ? { color: 'green' } : { color: 'red' }}
						>
							{
								cancelStatus === null ? '' : cancelStatus ? 'Success' : 'Error, please try again'
							}</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	);
}

export default CancelModal;
