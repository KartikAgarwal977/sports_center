import { API_ENDPOINT } from "../../config/constants";
import { articleAvailableAction, articleDispatch } from "./types";

export const fetchArticles = async(
    dispatch: articleDispatch,
) => {
    try {
        dispatch({ type: articleAvailableAction.FETCH_ARTICLE_REQUEST })
        const response = await fetch(`${API_ENDPOINT}/articles`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
            }
        })
        if (!response.ok) {
            throw new Error("Failed to Fetch Articles")
        }
        // console.log(response.status)
        const data = await response.json();
        // console.log(data)
        dispatch({type: articleAvailableAction.FETCH_ARTICLE_SUCCESSFUL, payload: data })
    } catch (error) {
        dispatch({type: articleAvailableAction.FETCH_ARTICLE_FAILURE, payload: "Unable to Load Articles"})
    }
}