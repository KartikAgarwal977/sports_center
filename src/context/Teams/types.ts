export type Team = {
    id: number;
    name: string;
    plays: string;
}
export type teamState = {
    teams: Team[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
}
export enum teamAvailableActions {
    FETCH_TEAM_FAILURE = "FETCH_TEAM_FAILURE",
    FETCH_TEAM_REQUEST = "FETCH_TEAM_REQUEST",
    FETCH_TEAM_SUCCESS = "FETCH_TEAM_SUCCESS"
}

export type teamActions = 
    | { type: teamAvailableActions.FETCH_TEAM_REQUEST}
    | { type: teamAvailableActions.FETCH_TEAM_FAILURE, payload: string }
    | { type: teamAvailableActions.FETCH_TEAM_SUCCESS, payload: Team[] };

    export type teamsDispatch = React.Dispatch<teamActions>
