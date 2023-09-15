/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo } from "react";

import "./appointmentItem.scss";
import dayjs from "dayjs";
import { Optional } from "utility-types";

import { IAppointment } from "../../shared/interfaces/appointment.interface";


type AppointmentProps = Optional<IAppointment, 'canceled'> & {
	openModal: (state: number) => void,
	getActiveAppointments: () => void
};

const AppointmentItem = memo(
	({
		id,
		date,
		name,
		service,
		phone,
		canceled,
		openModal,
		getActiveAppointments
	}: AppointmentProps) => {

		const [timeLeft, changeTimeLeft] = useState<string | null>(null);

		const formattedHoursDiff = () => {
			const hoursDiff = dayjs(date).diff(undefined, 'h');

			if (hoursDiff >= 24) {
				const daysDiff = Math.floor(hoursDiff / 24);
				return `${daysDiff}d ${hoursDiff % 24 < 10 ? `0${hoursDiff % 24}` : hoursDiff % 24}`;
			}

			return hoursDiff < 10 ? `0${hoursDiff}` : `${hoursDiff}`;
		}

		const formattedMinutesDiff = () => {
			const minutesDiff = dayjs(date).diff(undefined, 'm') % 60;
			const result = minutesDiff < 10 ? `0${minutesDiff}` : minutesDiff;
			return result;
		}

		useEffect(() => {
			changeTimeLeft(`${formattedHoursDiff()}:${formattedMinutesDiff()}`);
			// деление и получение остатка

			const intervalId = setInterval(() => {
				if (dayjs(date).diff(undefined, 'm') <= 0) {

					if (getActiveAppointments) {
						getActiveAppointments();
						clearInterval(intervalId);

					}
				} else {
					changeTimeLeft(`${formattedHoursDiff()}:${formattedMinutesDiff()}`);
				}
			}, 60000);

			return () => {
				clearInterval(intervalId);
			}
		}, [date])

		const formattedDate = dayjs(date).format('DD/MM/YYYY HH:mm');


		return (
			<div className="appointment">
				<div className="appointment__info">
					<span className="appointment__date">Date: {formattedDate}</span>
					<span className="appointment__name">Name: {name}</span>
					<span className="appointment__service">Service: {service}</span>
					<span className="appointment__phone">Phone: {phone}</span>
				</div>

				{!canceled ? (
					<>
						<div className="appointment__time">
							<span>Time left:</span>
							<span
								className="appointment__timer"
								style={timeLeft && timeLeft.length > 9 ? { fontSize: '23px' } : {}}
							>{timeLeft}</span>
						</div>
						<button
							className="appointment__cancel"
							onClick={() => {
								openModal(id)
							}}>
							Cancel
						</button>
					</>
				) : null}
				{canceled ? (
					<div className="appointment__canceled">Canceled</div>
				) : null}
			</div>
		);
	}
);

export default AppointmentItem;
