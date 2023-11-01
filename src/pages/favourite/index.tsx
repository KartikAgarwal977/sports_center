import TeamList from "./TeamList";

const Favourites = () => {
    return (
        <div className="bg-gray-300 dark:text-slate-500 dark:bg-slate-700">
            <h1 className="w-full text-gray-700 font-bold dark:text-slate-500 text-2xl">Favourites</h1>
            <TeamList/>
        </div>
    )
}
export default Favourites;