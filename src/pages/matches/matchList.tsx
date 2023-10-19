import React, { useEffect } from "react";
import { useMatchDispatch, useMatchState } from "../../context/matches/context"
import { fetchMatches } from "../../context/matches/action";
import { Link } from "react-router-dom";

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

        <div className="wrapper bg-gray-400 antialiased text-gray-900">
            <div>
            {matches.map((match: any) => (
                    <Link key={match.id} to={`${match.id}`} className="relative px-4 mt-16  ">
                        <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-lg">
                            <div className="">
                                <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold ">
                                {match.sportName}
                                </span>
                                <div className="ml-2 text-gray-600 uppercase text-xs font-semibold">
                                {match.location}
                                </div>
                            </div>

                            <h4 className="mt-1 text-xl font-semibold uppercase inline-block  truncate">A random Title</h4>

                            </div>
                        </Link>
            ))}
            </div>
        </div>
        );
    }
        {/* <div>
            {matches.map((match: any) => (
                
                <Link key={match.id} to={`${match.id}`} className="p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <div className="p-4 leading-normal">
                        <div className="mb-8">
                            <div className="text-gray-900 font-bold text-xl mb-2">{match.name}</div>
                            <div className="text-gray-700 font-bold">{match.location}</div>
                        </div>
                    </div>
                </Link>
            
        ))}
        </div> */}
      
      
      
export default MatchList;