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
    }, [dispatchArticle])

    if (sports.length === 0 && isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>{errorMessage}</div>;
    }

    const selectSport = (name: string) => {
        setSelectedSport(name);
    }

    return (
        <div className="grid gap-4 grid-cols-3 mt-5">
            <div className="col-span-2 bg-gray-300 w-full">
                <nav className="flex sm:justify-center space-x-4">
                    {preference?<div onClick={ () => selectSport("Prefered Article")} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">Prefered Article</div>:''}
                    <div onClick={() => selectSport("All")} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">
                        All
                    </div>
                    {sports.map((sport) => (
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
