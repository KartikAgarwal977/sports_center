import { matchAvailableAction, matchesDispatch } from "./types"
import { API_ENDPOINT } from "../../config/constants";
export const fetchMatches = async (dispatch: matchesDispatch) => {
    try {
        dispatch({ type: matchAvailableAction.FETCH_MATCH_REQUEST });
        const response = await fetch(
            `${API_ENDPOINT}/matches`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
        )
        if (!response.ok) throw new Error("Failed to load");
        const data = await response.json();
        console.log(data)
        dispatch({ type: matchAvailableAction.FETCH_MATCH_SUCCESSFUL, payload: data.matches })

    } catch (error) {
        dispatch({ type: matchAvailableAction.FETCH_MATCH_FAILURE, payload: "unable to load" })
    }
}
