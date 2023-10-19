import React,{ useEffect } from "react";
import { useMatchDispatch, useMatchState } from "../../context/matches/context"
import { fetchMatches } from "../../context/matches/action";
import { Link } from "react-router-dom";

const MatchList: React.FC = () => {
    const dispatchMatch = useMatchDispatch();
    useEffect(() => {
        fetchMatches(dispatchMatch)
    }, [])
    const state: any = useMatchState();
    const { matches: matchArray, isLoading, isError, errorMessage } = state;
    console.log(matchArray,`is in match`)
    if (matchArray.length === 0 && isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return (<h1>{errorMessage}</h1>)
    }

    return (
        <div>
          {Array.isArray(state.matches) && state.matches.length > 0 ? (
            state.matches.map((match) => {
              console.log(match); // Log the match object
              return (
                <Link key={match.id} to={`${match.id}`} className="block p-6 bg-white border border-gray-200 rounded-lg shadow w-full">
                  <div className="p-4 leading-normal">
                    <div className="mb-8">
                      <div className="text-gray-900 font-bold text-xl mb-2">{match.name}</div>
                      <div className="text-gray-700 font-bold">{match.location}</div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            "Unable to load your match data"
          )}
        </div>
      );
      
      
      
}
export default MatchList;