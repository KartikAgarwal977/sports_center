import { Reducer } from "react";
import { MatchesState, matchAvailableAction, matchesActions } from "./types";

export const initialState: MatchesState = {
    matches: [],
    isLoading: false,
    isError: false,
    errorMessage: ""
}

export const matchReducer: Reducer<MatchesState, matchesActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case matchAvailableAction.FETCH_MATCH_REQUEST:
            return { ...state, isLoading: true, }
        case matchAvailableAction.FETCH_MATCH_SUCCESSFUL:
            console.log(action.payload)
            return { ...state, isLoading: false, matches: action.payload}
        case matchAvailableAction.FETCH_MATCH_FAILURE:
            return { ...state, isLoading: false, isError: true, errorMessage: action.payload }
    }
}