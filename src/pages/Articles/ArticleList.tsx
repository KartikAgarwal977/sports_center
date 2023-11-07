import React, { useEffect, useState } from "react";
import ArticleListItems from "./ArticleListItem";
import { useArticleDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
import Favourites from "../favourite";
import { useSportDispatch, useSportState } from "../../context/Teams/context";
import { fetchSport } from "../../context/Teams/action";
import fetchPreference from "../perference/fetchpreference";

const ArticleList: React.FC = () => {
  const dispatchArticle = useArticleDispatch();
  const sportState = useSportState();
  const sportDispatch = useSportDispatch();
  const { sports, isLoading, isError, errorMessage } = sportState;
  const [preference, setPreference] = useState();
  const [selectedSport, setSelectedSport] = useState<string>("All");

  useEffect(() => {
    fetchSport(sportDispatch);
  }, []);

  useEffect(() => {
    const fetchPreferenceData = async () => {
      const result = await fetchPreference();
      setPreference(result.preferences);
      if (result.preferences !== null) {
        setSelectedSport("Prefered Article");
      }
    };
    fetchPreferenceData();
  }, []);

  useEffect(() => {
    fetchArticles(dispatchArticle);
  }, [dispatchArticle]);

  if (sports.length === 0 && isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{errorMessage}</div>;
  }

  const selectSport = (name: string) => {
    setSelectedSport(name);
  };

  return (
    <div className="grid gap-4 grid-cols-3 mt-5 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full">
      <div className="col-span-2 w-full h-full">
        <nav className="flex sm:justify-center space-x-4">
          {preference ? (
            <div
              onClick={() => selectSport("Prefered Article")}
              className="rounded-lg px-3 py-2 text-amber-500 dark:text-amber-300 font-medium hover:bg-amber-100 dark:hover:bg-gray-700 hover:text-amber-900"
            >
              Prefered Article
            </div>
          ) : (
            ""
          )}
          <div
            onClick={() => selectSport("All")}
            className="rounded-lg px-3 py-2 text-amber-500 dark:text-amber-300 font-medium hover:bg-amber-100 dark:hover:bg-gray-700 hover:text-amber-900"
          >
            All
          </div>
          {sports.map((sport) => (
            <div
              onClick={() => selectSport(sport.name)}
              className="rounded-lg px-3 py-2 text-amber-500 dark:text-amber-300 font-medium hover:bg-amber-100 dark:hover:bg-gray-700 hover:text-amber-900"
            >
              {sport.name}
            </div>
          ))}
        </nav>
        <ArticleListItems sportName={selectedSport} />
      </div>
      <div className="h-full">
        <Favourites />
      </div>
    </div>
  );  
};

export default ArticleList;
