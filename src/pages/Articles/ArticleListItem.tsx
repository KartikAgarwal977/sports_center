import { Link } from "react-router-dom";
import { useArticleState } from "../../context/articles/context";
import fetchPreference from "../perference/fetchpreference";
import { useEffect, useState } from "react";

interface PropState {
  sportName: string;
}
interface preferenceState{
  Ssports: string[];
  Steams: string[];
}

const ArticleListItems = (props: PropState) => {
  const state: any = useArticleState();
  const { articleData, isLoading, isError, errorMessage } = state;
  const [preference, setPreference] = useState<preferenceState|null>(null);

  useEffect(() => {
    const fetchPreferenceData = async () => {
      const result = await fetchPreference();
      setPreference(result.preferences);
    };
    fetchPreferenceData();
  }, []);
  if (articleData.length === 0 && isLoading) {
    return (<button
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
  console.log(preference, 'is the preference')
  if ( preference !== null &&
    props.sportName === "Prefered Article" &&
    preference.Ssports !== undefined &&
    preference.Steams !== undefined) {
    console.log(preference.Ssports, 'is the preference sports')
    const filteredArticles = articleData.filter((article: any) => {
      return preference.Ssports.includes(article.sport.name) || preference.Steams.includes(article.teams.name);
  })
    console.log('filtered', filteredArticles);
    return (
      <>
        <div className="scroll-smooth max-h-[725px] overflow-y-scroll bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article: any) => (
            <Link
              key={article.id}
              to={`articles/${article.id}`}
              className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow w-full lg:max-w-full lg:flex"
            >
              <div className="p-4 flex flex-col leading-normal">
                <div className="mb-8">
                  <p className="text-sm font-bold text-amber-500 dark:text-amber-300 flex">
                    {article.sport.name}
                  </p>
                  <div className="text-gray-900 dark:text-gray-100 font-bold text-xl mb-2">
                    {article.title}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base">{article.summary}</p>
                  <p className="text-gray-700 dark:text-gray-300 font-bold">
                    {new Date(article.date).toUTCString().split("", 16)}
                  </p>
                  <Link
                    to={`articles/${article.id}`}
                    className="text-amber-700 dark:text-amber-300 font-bold"
                  >
                    read more...
                  </Link>
                </div>
              </div>
              <img
                className="h-48 lg:h-auto rg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                src={article.thumbnail}
                title="Thumbnail"
                style={{ float: 'right', maxHeight: '200px', maxWidth: '200px' }}
              />
            </Link>
          ))
        ) : (
            <div className="text-gray-700 dark:text-gray-300 font-bold text-xl bg-white dark:bg-gray-900">No articles found</div>
        )}
      </div>
      </>
    )
  }  
  else if (props.sportName !== "All") {
    const filteredArticles = articleData.filter(
      (article: any) => article.sport.name === props.sportName
    );
  
    return (
      <div className="scroll-smooth max-h-[725px] overflow-y-scroll bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article: any) => (
            <Link
              key={article.id}
              to={`articles/${article.id}`}
              className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow w-full lg:max-w-full lg:flex"
            >
              <div className="p-4 flex flex-col leading-normal">
                <div className="mb-8">
                  <p className="text-sm font-bold text-amber-500 dark:text-amber-300 flex">
                    {article.sport.name}
                  </p>
                  <div className="text-gray-900 dark:text-gray-100 font-bold text-xl mb-2">
                    {article.title}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base">{article.summary}</p>
                  <p className="text-gray-700 dark:text-gray-300 font-bold">
                    {new Date(article.date).toUTCString().split("", 16)}
                  </p>
                  <Link
                    to={`articles/${article.id}`}
                    className="text-amber-700 dark:text-amber-300 font-bold"
                  >
                    read more...
                  </Link>
                </div>
              </div>
              <img
                className="h-48 lg:h-auto rg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                src={article.thumbnail}
                title="Thumbnail"
                style={{ float: 'right', maxHeight: '200px', maxWidth: '200px' }}
              />
            </Link>
          ))
        ) : (
            <div className="text-gray-700 dark:text-gray-300 font-bold text-xl bg-white dark:bg-gray-900">No articles found</div>
        )}
      </div>
    );
  }  else {
    return (
      <div className="scroll-smooth max-h-[725px] overflow-y-scroll bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {articleData.map((article: any) => (
          <Link
            key={article.id}
            to={`articles/${article.id}`}
            className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow w-full lg:max-w-full lg:flex"
          >
            <div className="p-4 flex flex-col leading-normal">
              <div className="mb-8">
                <p className="text-sm font-bold text-amber-500 dark:text-amber-300 flex">
                  {article.sport.name}
                </p>
                <div className="text-gray-900 dark:text-gray-100 font-bold text-xl mb-2">
                  {article.title}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-base">{article.summary}</p>
                <p className="text-gray-700 dark:text-gray-300 font-bold">
                  {new Date(article.date).toUTCString().split("", 16)}
                </p>
                <Link
                  to={`articles/${article.id}`}
                  className="text-amber-700 dark:text-amber-300 font-bold"
                >
                  read more...
                </Link>
              </div>
            </div>
            <img
              className="h-48 lg:h-auto rg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              src={article.thumbnail}
              title="Thumbnail"
              style={{ float: 'right', maxHeight: '200px', maxWidth: '200px' }}
            />
          </Link>
        ))}
      </div>
    );
  }  
};

export default ArticleListItems;
