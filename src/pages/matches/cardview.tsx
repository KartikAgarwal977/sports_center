import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { liveScore } from "../../context/matches/types";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";

interface propState {
  sportId: number;
}
const SportView = (prop: propState) => {
  const [data, setData] = useState<liveScore>();
  const fetchMatchData = async (id: number) => {
    const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: liveScore = await response.json();
    setData(data);
  };
  useEffect(() => {
    fetchMatchData(prop.sportId);
  }, [prop.sportId]);
  if (data) {
    if (data.isRunning) {
      return (
        <>
          <div className="bg-white dark:bg-slate-600 p-6 rounded-lg shadow-lg border-1">
            <div className="bg-amber-200 text-amber-800 text-xs px-2 inline-block rounded-full uppercase font-semibold">
              {data.sportName}
            </div>
            <button onClick={() => fetchMatchData(data.id)}>
              <ArrowPathRoundedSquareIcon className="h-6 w-6 ml-5 font-bold hover:rotate-90 duration-3000 text-amber-500 dark:text-amber-300" />
            </button>
            <div className="mt-2 text-gray-600 dark:text-gray-300 uppercase text-xs font-semibold">
              {data.location}
            </div>
            <h2 className="font-bold text-gray-600 dark:text-gray-300 uppercase text-xs">
              {data.score
                ? Object.entries(data.score).map(([key, value], index) => (
                    <div key={index}>
                      {key} : {value}
                    </div>
                  ))
                : "No Score"}
            </h2>
          </div>
        </>
      );
    }
  } else {
    return (
      <>
        <div className="bg-white dark:bg-slate-600 p-6 rounded-lg shadow-lg border-1">
          <p className="bg-amber-200 text-amber-800 text-xs px-2 inline-block rounded-full uppercase font-semibold">
            no live matches
          </p>
        </div>
      </>
    );
  }
};
export default SportView;
