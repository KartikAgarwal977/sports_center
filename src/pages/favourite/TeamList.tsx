import { useEffect, useState } from "react";
import FavArticle from "./favouriteArticle";
import {
  useSportDispatch,
  useSportState,
  useTeamDispatch,
  useTeamState,
} from "../../context/Teams/context";
import { fetchSport, fetchTeam } from "../../context/Teams/action";

const TeamList: React.FC = () => {
  const [selectedSportName, setSelectedSportName] = useState<string | null>(
    "All"
  );
  const [selectedTeamName, setSelectedTeamName] = useState<string | null>(
    "All"
  );
  const teamState = useTeamState();
  const teamDispatch = useTeamDispatch();
  const sportState = useSportState();
  const sportDispatch = useSportDispatch();
  const { sports } = sportState;
  const { teams, isLoading, isError, errorMessage } = teamState;

  useEffect(() => {
    fetchSport(sportDispatch);
    console.log(selectedSportName);
  }, []);

  useEffect(() => {
    fetchTeam(teamDispatch);
    console.log(selectedTeamName);
  }, []);

  if (teams.length === 0 && isLoading && sports.length === 0) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log(errorMessage);
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <label
        htmlFor="sport"
        className="block text-amber-500 dark:text-amber-300 font-semibold mb-2"
      >
        Choose Sport
      </label>
      <select
        id="sport"
        name="sport"
        value={selectedSportName || ""}
        onChange={(e) => {
          setSelectedSportName(e.target.options[e.target.selectedIndex].text);
        }}
        className="w-full border rounded-md py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:border-amber-800 dark:focus:border-amber-300 focus:shadow-outline-amber dark:focus:shadow-outline-gray"
      >
        <option value="" disabled hidden>
          Select a sport...
        </option>
        <option value="all">All</option>
        {sports.map((sport) => {
          return <option value={sport.name}>{sport.name}</option>;
        })}
      </select>

      <label
        htmlFor="team"
        className="block text-amber-500 dark:text-amber-300 font-semibold mb-2 w-full"
      >
        Choose Team
      </label>
      <select
        id="team"
        name="team"
        value={selectedTeamName || ""}
        onChange={(e) => {
          setSelectedTeamName(e.target.options[e.target.selectedIndex].text);
        }}
        className="w-full border rounded-md py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:border-amber-800 dark:focus:border-amber-300 focus:shadow-outline-amber dark:focus:shadow-outline-gray"
      >
        <option value="" disabled hidden>
          Select a team...
        </option>
        <option value="all">All</option>
        {teams.map((team) => {
          return <option value={team.name}>{team.name}</option>;
        })}
      </select>
      <FavArticle
        sportName={selectedSportName || "All"}
        teamName={selectedTeamName || "All"}
      />
    </div>
  );
};

export default TeamList;
