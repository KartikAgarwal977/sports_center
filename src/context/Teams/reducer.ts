import { Reducer } from "react";
import { teamActions, teamAvailableActions, teamState } from "./types";
export const  initialState: teamState = {
    teams: [],
    isLoading: false,
    isError: false,
    errorMessage: ""
}
export const teamReducer: Reducer<teamState, teamActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case teamAvailableActions.FETCH_TEAM_REQUEST:
            return { ...state, isLoading: true }
        case teamAvailableActions.FETCH_TEAM_SUCCESS:
            return { ...state, isLoading: false, teams: action.payload }
        case teamAvailableActions.FETCH_TEAM_FAILURE:
            return { ...state, isLoading: false, isError: true, errorMessage: action.payload };
    }
}
export default teamReducer;