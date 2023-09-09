import React, { createContext, useReducer } from "react";
import reducer, { IAppointmentState } from "./reducer";

import { ActionsTypes } from "./actions";

import useAppointmentService from "../../services/AppointmentServices";


const initialState: IAppointmentState = {
    allAppointments: [],
    activeAppointments: [],
    appointmentLoadindStatus: 'idle'
}

interface ProviderProps {
    children: React.ReactNode
}

interface AppointmentContextValue extends IAppointmentState {
    getAppointments: () => void,
    getActiveAppointments: () => void
}

export const AppointmentContext = createContext<AppointmentContextValue>({
    allAppointments: initialState.allAppointments,
    activeAppointments: initialState.activeAppointments,
    appointmentLoadindStatus: initialState.appointmentLoadindStatus,
    getAppointments: () => { },
    getActiveAppointments: () => { }
});

const AppointmentContextProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // Частая ошибка, в редусере нужно создать интерфейс по массиву данных

    const {
        loadingStatus,
        getAllAppointments,
        getAllActiveAppointments
    } = useAppointmentService();
    // Хуки должны быть только внутри компонентов

    const value: AppointmentContextValue = {
        allAppointments: state.allAppointments,
        activeAppointments: state.activeAppointments,
        appointmentLoadindStatus: loadingStatus,
        getAppointments: () => {
            getAllAppointments().then(data => dispatch({ type: ActionsTypes.SET_ALL_APPOINTMENTS, payload: data }));
        },
        getActiveAppointments: () => {
            getAllActiveAppointments().then(data => dispatch({ type: ActionsTypes.SET_ACTIVE_APPOINTMENTS, payload: data }))
        }
    }

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    )
}

export default AppointmentContextProvider;