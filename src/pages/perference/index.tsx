import { Fragment, useEffect, useState } from "react";
import {
  useSportDispatch,
  useSportState,
  useTeamDispatch,
  useTeamState,
} from "../../context/Teams/context";
import { fetchSport, fetchTeam } from "../../context/Teams/action";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import updatePreference from "./updatepreference";

const PreferencesArticle = () => {
  const [isOpen, setIsOpen] = useState(true);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  if (!token) {
    navigate("/signin");
  }
  const teamState = useTeamState();
  const teamDispatch = useTeamDispatch();
  const sportState = useSportState();
  const sportDispatch = useSportDispatch();
  const { sports } = sportState;
  const { teams, isLoading, isError, errorMessage } = teamState;
  useEffect(() => {
    fetchTeam(teamDispatch);
  }, []);
  useEffect(() => {
    fetchSport(sportDispatch);
  }, []);
  
  if (teams.length == 0 && isLoading && sports.length == 0)
    return <div>Loading...</div>;
  if (isError) return <div>{errorMessage}</div>;
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const selectedTeams = Array.from(event.target.elements)
      .filter((element: any) => element.checked && element.name == 'team')
          .map((element: any) => element.value);
      const selectedSportName = Array.from(event.target.elements)
          .filter((element: any) => element.checked && element.name == 'sport')
          .map((element: any) => element.value);
      console.log(selectedTeams);
      console.log(selectedSportName);
      updatePreference(selectedTeams, selectedSportName);
    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
    navigate("../");
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex items-center justify-center z-10"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-50"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="fixed inset-0 flex items-center justify-center">
                  <Dialog.Panel className="bg-amber-500 rounded-lg p-6 max-h-96 max-w-96 overflow-auto">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold text-center text-slate-900"
                    >
                      Preferences
                    </Dialog.Title>
                    <form
                      onSubmit={handleSubmit}
                      className="mt-4 grid grid-cols-2 gap-4"
                    >
                      <div>
                        <div className="text-lg font-bold text-white">Team</div>
                        {teams.map((team) => {
                          return (
                            <div
                              key={team.name}
                              className="flex items-center my-2"
                            >
                              <input
                                type="checkbox"
                                id={team.name}
                                name='team'
                                value={team.name}
                                className="mr-2"
                              />
                              <label htmlFor={team.name} className="text-white">
                                {team.name}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">
                          Sports
                        </div>
                        {sports.map((sport) => {
                          return (
                            <div
                              key={sport.id}
                              className="my-2 flex items-center"
                            >
                              <input
                                type="checkbox"
                                id={sport.name}
                                name='sport'
                                value={sport.name}
                                className="mr-2"
                              />
                              <label
                                htmlFor={sport.name}
                                className="text-white"
                              >
                                {sport.name}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                      <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-white border-1 text-amber-500 rounded hover:bg-amber-200 transition-colors col-span-2"
                      >
                        Submit
                      </button>
                      <button
                        onClick={closeModal}
                        className="w-full py-2 bg-white mt-8 border-1 shadow-md hover:shadow hover:bg-amber-200 col-span-2"
                      >
                        Cancel
                      </button>
                    </form>
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default PreferencesArticle;
