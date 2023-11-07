import MatchList from "./matchList";

const Matches = () => {
  return (
    <>
      <div className="flex justify-between bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h1 className="text-2xl font-medium tracking-tight text-amber-500 dark:text-amber-300">
          Live Matches
        </h1>
      </div>
      <MatchList />
    </>
  );
  
};
export default Matches;
