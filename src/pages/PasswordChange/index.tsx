import { Dialog, Transition } from "@headlessui/react";
import { API_ENDPOINT } from "../../config/constants";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const res = await fetch(`${API_ENDPOINT}/user/password`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
          }),
        });
        if (!res.ok) {
          throw new Error(await res.text());
        }
      } catch (err) {
        console.log("error occured", err);
      }
    };
    fetchFunc();
  }, [currentPassword, newPassword]);

  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setCurrentPassword(event.target.currentPassword.value);
    setNewPassword(event.target.newPassword.value);
    alert("password updated!");
    navigate("/dashboard");
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
                <Dialog.Panel className="bg-amber-500 dark:bg-gray-800 rounded-lg p-6 max-h-full max-w-full overflow-auto flex items-center">
                    <img src="https://th.bing.com/th/id/OIP.IYQ_J4JINaCnyfCWDsUkaQHaFW?rs=1&pid=ImgDetMain" alt="Description" className="w-1/2 h-full object-cover" />
                    <div className="w-1/2 p-6">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-bold text-center text-black dark:text-gray-300"
                      >
                        Change Password
                      </Dialog.Title>
                      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <input
                          type="password"
                          placeholder="Enter current Password"
                          name="currentPassword"
                          className="p-2 border rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        />
                        <input
                          type="password"
                          name="newPassword"
                          placeholder="New password"
                          className="p-2 border rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        />
                        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Save</button>
                      </form>
                    </div>
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
export default ChangePassword;