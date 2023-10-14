import { Reducer } from 'react'
import { articleActions, articleAvailableAction, articleState } from './types'

export const initialState: articleState = {
    articleData: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
}
export const articleReducer: Reducer<articleState, articleActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case articleAvailableAction.FETCH_ARTICLE_REQUEST:
            return { ...state, isLoading: true }
        case articleAvailableAction.FETCH_ARTICLE_SUCCESSFUL: 
            return { ...state, isLoading: false, articleData: Array.isArray(action.payload)? action.payload : [action.payload] }
        case articleAvailableAction.FETCH_ARTICLE_FAILURE:
            return { ...state, isLoading: false, errorMessage: action.payload }
        default:
            return state;
    }
}