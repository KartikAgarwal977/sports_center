import ArticleList from "./ArticleList"

const Articles = () => {
    
    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-2xl font-medium tracking-tight text-slate-700 dark:text-slate-300">Trending News</h1>
            </div>
            <ArticleList/>
        </>
    )
}
export default Articles