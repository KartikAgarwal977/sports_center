import { Team } from "../articles/types";

export type matchData = {
    id: number;
    name: string;
    location: string;
    sportName: string;
    endAt: Date;
}
export interface MatchesState {
    matches: matchData[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
}
export interface liveScore {
    id: number;
    isRunning: boolean;
    name: string;
    location: string;
    startsAt: Date;
    endsAt: Date;
    score: Score;
    teams: Team[];
    sportName: string;
    playingTeam: number;
    story: string;
}
export interface Score {
    [key: string]: string;
} 
export enum matchAvailableAction {
    FETCH_MATCH_REQUEST = "FETCH_MATCH_REQUEST",
    FETCH_MATCH_SUCCESSFUL = 'FETCH_MATCH_SUCCESSFUL',
    FETCH_MATCH_FAILURE= 'FETCH_MATCH_FAILURE',
}
export type matchesActions = 
    | { type: matchAvailableAction.FETCH_MATCH_REQUEST }
    | { type: matchAvailableAction.FETCH_MATCH_SUCCESSFUL, payload: matchData[] }
    | { type: matchAvailableAction.FETCH_MATCH_FAILURE, payload: string };

export type matchesDispatch = React.Dispatch<matchesActions>
