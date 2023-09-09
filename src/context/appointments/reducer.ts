import { AppointmentAction, ActionsTypes } from "./actions";
import { IAppointment, ActiveAppointment } from "../../shared/interfaces/appointment.interface";

import { loadingStatusOptions } from "../../hooks/http.hook";

export interface IAppointmentState {
    allAppointments: IAppointment[] | [],
    activeAppointments: ActiveAppointment[] | [],
    appointmentLoadindStatus: loadingStatusOptions
}

export default function reducer(
    state: IAppointmentState,
    action: AppointmentAction
): IAppointmentState {
    switch (action.type) {
        case ActionsTypes.SET_ALL_APPOINTMENTS:
            return {
                ...state,
                allAppointments: action.payload,
                appointmentLoadindStatus: 'idle'
            };
        case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
            return {
                ...state,
                activeAppointments: action.payload,
                appointmentLoadindStatus: 'idle'
            };
        case ActionsTypes.FETCHING_APPOINTMENTS:
            return { ...state, appointmentLoadindStatus: 'loading' }
        case ActionsTypes.ERROR_FETCHING_APPOINTMENTS:
            return { ...state, appointmentLoadindStatus: 'error' }
        default:
            return state;
    }
}