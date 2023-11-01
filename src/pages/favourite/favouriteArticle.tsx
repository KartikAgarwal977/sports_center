import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useArticleState } from "../../context/articles/context";

interface PropState {
    sportName: string;
    teamName: string;
}

const FavArticle = (props: PropState) => {
    const state: any = useArticleState();
    const { articleData, isLoading, isError, errorMessage } = state;
    const [filteredArticles, setFilteredArticles] = useState([]);

    useEffect(() => {
        let articles = articleData;

        if (props.sportName !== "All") {
            articles = articles.filter(
                (article: any) => article.sport.name === props.sportName
            );
        }

        if (props.teamName !== "All") {
            articles = articles.filter(
                (article: any) => article.teams.some((team: { name: string; }) => team.name === props.teamName)
            );
        }
        
        console.log(articles)
        setFilteredArticles(articles);
    }, [props.sportName, props.teamName, articleData]);

    if (articleData.length === 0 && isLoading) {
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
        )
    }

    if (isError) {
        return <h1>{errorMessage}</h1>;
    }

    return (
        <div className="scroll-smooth max-h-[500px] overflow-y-scroll">
            {filteredArticles.length > 0 ? (
                filteredArticles.map((article: any) => (
                    <Link
                        key={article.id}
                        to={`articles/${article.id}`}
                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow w-full lg:max-w-full lg:flex"
                    >
                        <div className="p-4 flex flex-col leading-normal">
                            <div className="mb-8">
                                <p className="text-sm font-bold text-gray-600 flex">
                                    {article.sport.name}
                                </p>
                                <div className="text-gray-900 font-bold text-xl mb-2">
                                    {article.title}
                                </div>
                                <div className="text-gray-900 font-bold text-xl mb-2">
                                    {article.teams.name}
                                </div>
                                <p className="text-gray-700 text-base">{article.summary}</p>
                                <p className="text-gray-700 font-bold">
                                    {new Date(article.date).toUTCString().split("", 16)}
                                </p>
                                <Link
                                    to={`articles/${article.id}`}
                                    className="text-blue-700 font-bold"
                                >
                                    read more...
                                </Link>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <div className="text-gray-700 font-bold text-xl bg-white">No articles found</div>
            )}
        </div>
    );
}

export default FavArticle;
