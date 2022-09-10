import cls from "classnames";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/components/Navbar.module.css";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useAuthStore } from "../contextApi/UserContext";
const Navbar = ({ open, showNav, setShowNav }) => {
  const [userLocal, setUserLocal] = useState("");

  const { authState } = useAuthStore();

  const { user, loading, error } = authState;

  useEffect(() => {
    if (user) {
      setUserLocal(
        localStorage.getItem("userBlogInfo")
          ? JSON.parse(localStorage.getItem("userBlogInfo"))
          : ""
      );
    }
  }, [user]);

  const handleLogout = () => {
    setUserLocal(localStorage.removeItem("userBlogInfo"));
  };

  return (
    <>
      <div
        className={`${
          open
            ? "w-96 flex flex-col p-3 bg-gray-100 drop-shadow-2xl shadow duration-500"
            : "bg-gray-300 h-full p-2 "
        }`}
      >
        <div className="">
          <div className="flex items-center justify-between relative -z-0">
            <h2 className="text-xl font-bold text-center  w-full tracking-wide">
              Technology Trip
            </h2>
            {open ? (
              ""
            ) : (
              <button onClick={() => setShowNav(!showNav)}>
                {!showNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ease-in duration-300"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                )}
              </button>
            )}
          </div>

          <div
            className={`flex-1    ${
              open
                ? "flex justify-center py-2 items-center h-screen"
                : showNav
                ? " w-screen  absolute top-11 left-0 transition-all duration-500 ease-linear -z-0 bg-gray-100"
                : " w-screen  absolute -top-96 left-0 transition-all duration-500 ease-linear -z-0 bg-gray-100"
            }`}
          >
            <ul
              className={`pt-2 pb-4 space-y-1 text-lg mt text-center font-bold  ${
                showNav ? "block " : "block  "
              }`}
            >
              <li className={cls(styles.highlight, "flex justify-center py-2")}>
                <Link
                  href="/"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <a>
                    <span className="text-gray-800 hover:highlight">Home</span>
                  </a>
                </Link>
              </li>
              <li className={cls(styles.highlight, "flex justify-center py-2")}>
                <Link
                  href="/frontend"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <a>
                    <span className="text-gray-800 hover:highlight">
                      Frontend
                    </span>
                  </a>
                </Link>
              </li>
              <li className={cls(styles.highlight, "flex justify-center py-2")}>
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <span className="text-gray-800">Orders</span>
                </a>
              </li>
              <li className={cls(styles.highlight, "flex justify-center py-2")}>
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <span className="text-gray-800">Settings</span>
                </a>
              </li>
              {!userLocal ? (
                <li
                  className={cls(styles.highlight, "flex justify-center py-2")}
                >
                  <a
                    href="/login"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <span className="text-gray-800">Login</span>
                  </a>
                </li>
              ) : (
                ""
              )}
              {!userLocal ? (
                ""
              ) : (
                <Menu>
                  {({ open }) => (
                    <>
                      <span className="rounded-md shadow-sm">
                        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 my-4 text-sm font-medium leading-5 text-gray-800 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                          <span>Admin</span>
                          <svg
                            className="w-5 h-5 ml-2 -mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Menu.Button>
                      </span>

                      <Transition
                        show={open}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="absolute right-0 lg:-right-20 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                        >
                          <div className="px-4 py-3">
                            <p className="text-sm leading-5">Signed in as</p>
                            <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                              {userLocal.info.name}
                            </p>
                          </div>

                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={`${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                >
                                  {" "}
                                  <Link href="/admin">Overview</Link>
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={`${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                >
                                  {" "}
                                  <Link href="/admin/Create">Create Blog</Link>
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#license"
                                  className={`${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                >
                                  Users
                                </a>
                              )}
                            </Menu.Item>
                          </div>

                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  onClick={handleLogout}
                                  className={`${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                >
                                  Sign out
                                </span>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
