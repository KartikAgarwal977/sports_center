import React, { useEffect, useState } from "react";
import ArticleListItems from "./ArticleListItem";
import { useArticleDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
import { API_ENDPOINT } from "../../config/constants";
import Favourites from "../favourite";
interface Sports {
    id: number;
    name: string;
}

const ArticleList: React.FC = () => {
    const dispatchArticle = useArticleDispatch();
    const [sportsData, setSportsData] = useState<Sports[]>([]); 
    const [selectedSport, setSelectedSport] = useState<string>("All");

    const fetchSport = async () => {
      const response = await fetch(`${API_ENDPOINT}/sports`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      const sports = responseData.sports;
    //   console.log(sports);
      setSportsData(sports); 
    };

    useEffect(() => {
        fetchSport();
    }, []);

    useEffect(() => {
        fetchArticles(dispatchArticle);
    }, [dispatchArticle]);

    const selectSport = (name: string) => {
        setSelectedSport(name);
    }

    return (
        <div className="grid gap-4 grid-cols-3 mt-5">
            <div className="col-span-2 bg-gray-300 w-full">
                <nav className="flex sm:justify-center space-x-4">
                    <div onClick={() => selectSport("All")} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">
                        All
                    </div>
                    {sportsData.map((sport) => (
                        <div onClick={() => selectSport(sport.name)} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">
                            {sport.name}
                        </div>
                    ))}
                </nav>
            <ArticleListItems sportName={selectedSport} />
            </div>
            <div>
                <Favourites/>
            </div>
        </div>
    );
}

export default ArticleList;
