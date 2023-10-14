import React, { createContext, useReducer } from "react";
import { articleReducer, initialState } from "./reducer";
import { articleDispatch, articleState } from "./types";


const ArticleStateContext = createContext<articleState>(initialState);
const ArticleDispatchContext = createContext<articleDispatch>(() => { }) 
export const ArticleProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(articleReducer, initialState);
    return (
        <ArticleStateContext.Provider value={state}>
            <ArticleDispatchContext.Provider value={dispatch}>
                {children}
            </ArticleDispatchContext.Provider>
        </ArticleStateContext.Provider>
        
    )
}