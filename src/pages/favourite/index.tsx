import TeamList from "./TeamList";

const Favourites = () => {
    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 className="w-full text-amber-500 dark:text-amber-300 font-bold text-2xl">Favourites</h1>
            <TeamList/>
        </div>
    )
}
export default Favourites;
