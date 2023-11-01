import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Team } from "../../context/Teams/types";
import FavArticle from "./favouriteArticle";

interface Sports {
  id: number;
  name: string;
}

const TeamList: React.FC = () => {
  const [data, setData] = useState<Team[]>([]);
  const [sportdata, setSportsData] = useState<Sports[]>([]);
  const [selectedSport, setSelectedSport] = useState<number | null>(null);
  const [selectedSportName, setSelectedSportName] = useState<string | null>(
    'All'
  );
  const [selectedTeamName, setSelectedTeamName] = useState<string | null>('All');

  const fetchSport = async () => {
    const response = await fetch(`${API_ENDPOINT}/sports`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    const sports = responseData.sports;
    // console.log(sports);
    setSportsData(sports);
  };

  useEffect(() => {
    fetchSport();
    console.log(selectedSportName)
  }, []);

  const fetchTeam = async () => {
    const response = await fetch(`${API_ENDPOINT}/teams`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    // console.log(data);
    setData(data);
  };

  useEffect(() => {
    fetchTeam();
    console.log(selectedTeamName)
  }, []);

  return (
    <div>
      <label htmlFor="sport">Choose Sport</label>
      <select
        id="sport"
        name="sport"
        value={selectedSport}
        onChange={(e) => {
          setSelectedSport(e.target.value);
          setSelectedSportName(e.target.options[e.target.selectedIndex].text);
        }}
          >
        <option value="" disabled hidden>
          Select a sport...
        </option>
        <option value="all">All</option>
        {sportdata.map((sport) => {
          return <option value={sport.id}>{sport.name}</option>;
        })}
      </select>

      <label htmlFor="sport" className="w-full">Choose Team</label>
      <select
        id="team"
        name="team"
        value={selectedTeamName}
        onChange={(e) => {
            setSelectedTeamName(e.target.options[e.target.selectedIndex].text);
        }}
      >
        <option value="" disabled hidden>
          Select a team...
        </option>
        <option value="all">All</option>
        {data.map((team) => {
          return <option value={team.name}>{team.name}</option>;
        })}
      </select>
      <FavArticle sportName={selectedSportName} teamName={selectedTeamName} />
    </div>
  );
};

export default TeamList;
