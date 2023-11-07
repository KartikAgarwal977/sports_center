import { API_ENDPOINT } from "../../config/constants"
import { sportAvailableActions, sportDispatch, teamAvailableActions, teamsDispatch } from "./types"

export const fetchTeam = async (dispatch: teamsDispatch) => {
    try {
        dispatch({ type: teamAvailableActions.FETCH_TEAM_REQUEST })
        const response = await fetch(`${API_ENDPOINT}/teams`,
            { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error(await response.text())
        const data = await response.json();
        console.log(data)
        dispatch({ type: teamAvailableActions.FETCH_TEAM_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: teamAvailableActions.FETCH_TEAM_FAILURE, payload: "unable to load" })
        }
}

export const fetchSport = async (dispatch: sportDispatch) => {
    try {
        dispatch({ type: sportAvailableActions.FETCH_SPORTS_REQUEST })
        const response = await fetch(`${API_ENDPOINT}/sports`,
            { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error(await response.text())
        const data = await response.json();
        console.log(data)
        dispatch({ type: sportAvailableActions.FETCH_SPORTS_SUCCESS, payload: data.sports })
    }
    catch (error) {
        dispatch({ type: sportAvailableActions.FETCH_SPORTS_FAILURE, payload: "unable to load" })
        }
}