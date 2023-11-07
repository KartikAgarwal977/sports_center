import React, { createContext, useContext, useReducer } from "react";
import { sportDispatch, sportState, teamState,  teamsDispatch } from "./types";
import { initialState, sportInitialState, sportReducer, teamReducer } from "./reducer";

const TeamStateContext = createContext<teamState>(initialState);
const TeamDispatchContext = createContext<teamsDispatch>(() => { })

export const TeamProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(teamReducer, initialState);
    return (
        <TeamStateContext.Provider value={state}>
            <TeamDispatchContext.Provider value={dispatch}>
                {children}
            </TeamDispatchContext.Provider>
        </TeamStateContext.Provider>
    )
}
export const useTeamState = () => useContext(TeamStateContext)
export const useTeamDispatch = () => useContext(TeamDispatchContext)


const SportStateContext = createContext<sportState>(sportInitialState);
const SportDispatchContext = createContext<sportDispatch>(() => { });
export const SportProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(sportReducer, sportInitialState);
    return (
        <SportStateContext.Provider value={state}>
            <SportDispatchContext.Provider value={dispatch}>
                {children}
            </SportDispatchContext.Provider>
        </SportStateContext.Provider>
    );
};
export const useSportState = () => useContext(SportStateContext);
export const useSportDispatch = () => useContext(SportDispatchContext);
