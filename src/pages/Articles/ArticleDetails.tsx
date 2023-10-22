import { Fragment, useEffect, useState } from "react";
import { infoarticle } from "../../context/articles/types";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
const ArticleDetails = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  let [data, setData] = useState<infoarticle>({});
  const fetchArticleData = async (id: string) => {
    const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    data = await response.json();
    console.log(data);
    setData(data);
  };
  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }
  useEffect(() => {
    if (id) fetchArticleData(id);
  }, [id]);
  const { thumbnail, content, teams, title, date } = data;
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-50"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title
                    as="h2"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="grid grid-cols-5 gap-2">
                      <div className="text-2xl font-bold col-span-4">{title}</div>
                      <div>
                        <button
                          onClick={closeModal}
                          className="inline-flex justify-center "
                        >
                          <XMarkIcon className="w-6 h-6 text-black dark:text-white" />
                        </button>
                      </div>
                    </div>
                  </Dialog.Title>

                  <div className="mt-2">
                    <img
                      className="w-400 border rounded-md py-2 px-3 my-4"
                      src={thumbnail}
                      alt="Thumbnail"
                    />
                    <div>
                      <span className="text-sm text-blue-700">Date :</span>{" "}
                      {new Date(date).toUTCString().split("", 16)}
                    </div>
                    <ul>
                      {teams?.map((team, index) => (
                        <li key={index}>{team.name}</li>
                      ))}
                    </ul>
                    <div className="text-sm mt-2 text-gray-700 dark:text-slate-400">
                      {content}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default ArticleDetails;
