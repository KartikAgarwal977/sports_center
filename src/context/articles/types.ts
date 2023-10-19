export type Team = {
    id: number;
    name: string;
}
export type SportDetails = {
    id: number;
    name: string
}
export type articleState = {
    articleData: ArticleData[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
}
export type ArticleData = {
    id: number;
    title: string;
    thumbnail: string;
    sport: SportDetails;
    date: Date;
    summary: string;
    teams: Team[];
}
export enum articleAvailableAction {
    FETCH_ARTICLE_REQUEST = "FETCH_ARTICLE_REQUEST",
    FETCH_ARTICLE_SUCCESSFUL = 'FETCH_ARTICLE_SUCCESSFUL',
    FETCH_ARTICLE_FAILURE= 'FETCH_ARTICLE_FAILURE',
}
export type articleActions = 
    | { type: articleAvailableAction.FETCH_ARTICLE_REQUEST }
    | { type: articleAvailableAction.FETCH_ARTICLE_SUCCESSFUL, payload: ArticleData[] }
    | { type: articleAvailableAction.FETCH_ARTICLE_FAILURE, payload: string };

export type articleDispatch = React.Dispatch<articleActions>