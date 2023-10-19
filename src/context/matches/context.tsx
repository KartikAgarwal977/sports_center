import React, { createContext, useContext, useReducer } from "react";
import { MatchesState,  matchesDispatch } from "./types";
import { initialState, matchReducer } from "./reducer";

const MatchStateContext = createContext<MatchesState>(initialState);
const MatchDispatchContext = createContext<matchesDispatch>(() => { })

export const MatchProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(matchReducer, initialState);
    return (
        <MatchStateContext.Provider value={state}>
            <MatchDispatchContext.Provider value={dispatch}>
                {children}
            </MatchDispatchContext.Provider>
        </MatchStateContext.Provider>
    )
}
export const useMatchState = () => useContext(MatchStateContext)
export const useMatchDispatch = () => useContext(MatchDispatchContext)