import React, { useEffect } from "react";
import ArticleListItems from "./ArticleListItem";
import { useArticleDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
const ArticleList: React.FC = () => {
    const dispatchArticle = useArticleDispatch();
    useEffect(() => {
        fetchArticles(dispatchArticle)
    },[])
    return (
        <div className="grid gap-4 grid-cols-1 mt-5">
            <ArticleListItems />
        </div>
    )
}
export default ArticleList;