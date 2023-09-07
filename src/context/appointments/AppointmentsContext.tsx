import React, { createContext, useReducer } from "react";
import reducer, { IInitialState } from "./reducer";

import { ActionsTypes } from "./actions";

import useAppointmentService from "../../services/AppointmentServices";


const initialState: IInitialState = {
    allAppointmnets: [],
    activeAppointments: []
}

interface ProviderProps {
    children: React.ReactNode
}

interface AppointmentContextValue extends IInitialState {
    getAppointments: () => void
}

export const AppointmentContext = createContext<AppointmentContextValue>({
    allAppointmnets: initialState.allAppointmnets,
    activeAppointments: initialState.activeAppointments,
    getAppointments: () => { }
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
        allAppointmnets: state.allAppointmnets,
        activeAppointments: state.activeAppointments,
        getAppointments: () => {
            getAllAppointments().then(data => dispatch({ type: ActionsTypes.SET_ALL_APPOINTMENTS, payload: data }));
        }
    }

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    )
}

export default AppointmentContextProvider;