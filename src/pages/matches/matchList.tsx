import React, { useEffect } from "react";
import { useMatchDispatch, useMatchState } from "../../context/matches/context"
import { fetchMatches } from "../../context/matches/action";
import SportView from "./cardview";

const MatchList: React.FC = () => {
    const dispatchMatch = useMatchDispatch();
    useEffect(() => {
        fetchMatches(dispatchMatch)
    }, [])
    const state: any = useMatchState();
    const { matches, isLoading, isError, errorMessage } = state;
    console.log(matches, `is in match`)
    if (matches.length === 0 && isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return (<h1>{errorMessage}</h1>)
    }

    return (

        <div className="wrapper bg-gray-100 antialiased text-gray-900">
    <div className="mx-4 my-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {matches.map((match: any) => (
        // <div key={match.id} className="bg-white p-6 rounded-lg shadow-lg">
        //   <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold">
        //     {match.sportName}
        //   </span>
        //   <div className="mt-2 text-gray-600 uppercase text-xs font-semibold">
        //     {match.location}
        //   </div>
        //   <h4 className="mt-2 text-xl font-semibold uppercase">{match.name}</h4>
        // </div>
        <SportView sportId={match.id} key={match.id} />
      ))}
    </div>
  </div>
        );
    }  
export default MatchList;