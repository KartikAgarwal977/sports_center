import { Link } from "react-router-dom";
import { useArticleState } from "../../context/articles/context";

export default function ArticleListItems() {
    const state: any = useArticleState();
    const { articleData, isLoading, isError, errorMessage } = state;
    console.log(articleData)

    if (articleData.length === 0 && isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return (<h1>{errorMessage}</h1>);
    }
    return (
        <>
            {articleData.map((article: any) => (
                <Link key={article.id} to={`${article.id}`} className="block p-6 bg-white border border-gray-200 rounded-lg shadow w-full lg:max-w-full lg:flex">
                <div className=" p-4 flex flex-col leading-normal">
                  <div className="mb-8">
                    <p className="text-sm font-bold text-gray-600 flex">{article.sport.name}</p>
                    <div className="text-gray-900 font-bold text-xl mb-2">{article.title}</div>
                    <p className="text-gray-700 text-base">{article.summary}</p>
                    <p className="text-gray-700 font-bold ">{new Date(article.date).toUTCString().split("", 16)}</p>
                  </div>
                </div>
                <img className="h-48 lg:h-auto rg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" src={article.thumbnail} title="Thumbnail" style={{float: 'right', width: '100px', height: '100px'}}/>
              </Link>
            ))}
        </>
    )
}