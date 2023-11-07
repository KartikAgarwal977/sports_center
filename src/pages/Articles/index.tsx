import ArticleList from "./ArticleList";
const Articles = () => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h1 className="text-2xl font-medium tracking-tight text-amber-500 dark:text-amber-300">
          Trending News
        </h1>
        <div>
          <ArticleList />
        </div>
      </div>
    </>
  );
};

export default Articles;
