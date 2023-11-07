import React, { useEffect } from "react";
import { useMatchDispatch, useMatchState } from "../../context/matches/context";
import { fetchMatches } from "../../context/matches/action";
import SportView from "./cardview";

const MatchList: React.FC = () => {
  const dispatchMatch = useMatchDispatch();
  useEffect(() => {
    fetchMatches(dispatchMatch);
  }, []);
  const state: any = useMatchState();
  const { matches, isLoading, isError, errorMessage } = state;

  if (matches.length === 0 && isLoading) {
    return (
      <button
        type="button"
        className="bg-amber-500 text-white px-4 py-2 w-full rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled
      >
        <svg
          className="animate-spin h-5 w-5 mr-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291a7.962 7.962 0 006-2.291V12H6v5.291z"
          ></path>
        </svg>
        Loading...
      </button>
    );
  }
  if (isError) {
    return <h1 className="text-amber-500 dark:text-amber-300">{errorMessage}</h1>;
  }

  return (
    <div className="wrapper bg-white dark:bg-gray-800 antialiased text-gray-900 dark:text-gray-300">
      <div className="mx-4 my-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match: any) => (
          <SportView sportId={match.id} key={match.id} />
        ))}
      </div>
    </div>
  );
};
export default MatchList;
