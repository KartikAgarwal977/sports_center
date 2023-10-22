import MatchList from "./matchList";

const Matches = () => {
  return (
    <>
      <div className="flex justify-between">
      <h1 className="text-2xl font-medium tracking-tight text-slate-700 dark:text-slate-300">
        Live Matches
      </h1>
      </div>
      <MatchList />
    </>
  );
};
export default Matches;
