import { Fragment, useContext, useState } from "react";
import { Disclosure, Menu, Transition, Switch } from "@headlessui/react";
import { UserCircleIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/images/logo.png";
import { ThemeContext } from "../../context/theme";
import { Link } from "react-router-dom";

const isloggedinuser = !!localStorage.getItem("authToken");
const userNavigation = [
  isloggedinuser
    ? [
        {
          name: "SignOut",
          href: "/logout",
        },
        {
          name: "ChangePassword",
          href: "/changePassword",
        },
      ]
    : [
        {
          name: "Signin",
          href: "/signin",
        },
        {
          name: "Signup",
          href: "/signup",
        },
      ],
];

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(theme === "dark");

  const toggleTheme = () => {
    let newTheme = "";
    if (theme === "light") {
      newTheme = "dark";
      localStorage.setItem('theme','dark')
    } else {
      newTheme = "light";
      localStorage.setItem('theme','light');
    }
    setEnabled(!enabled);
    setTheme(newTheme);
  };

  return (
    <>
      <Disclosure
        as="nav"
        className="border-b bg-amber-500 dark:bg-gray-800 text-black dark:text-gray-300 border-slate-200"
      >
        {() => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-20 rounded-full border-2 border-transparent transition-colors"
                    src={Logo}
                    alt="Sports Center"
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Switch
                    checked={enabled}
                    onChange={toggleTheme}
                    className={`${enabled ? "bg-slate-400" : "bg-slate-700"}
relative inline-flex h-[24px] w-[100px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${enabled ? "translate-x-9" : "translate-x-0"}
  pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        />
                      </svg>
                    </span>
                  </Switch>

                  <div className="rounded-full mx-2 bg-white dark:bg-gray-800 p-1 text-gray-400 hover:text-blue-600">
                    {isloggedinuser ? (
                      <Link to="preference" className="h-6 w-6">
                        <UserGroupIcon className="h-6 w-6" aria-hidden="true" />
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="rounded-full bg-white dark:bg-gray-800 p-1 text-gray-400 hover:text-blue-600">
                        <UserCircleIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.flat(1).map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100 dark:bg-gray-700" : "",
                                  "block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
