import React, { createContext, useContext, useReducer } from "react";
import { teamState,  teamsDispatch } from "./types";
import { initialState, teamReducer } from "./reducer";

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