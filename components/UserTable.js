import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../contextApi/UserContext";

function UserTable() {
  const { authState, authDispatch } = useAuthStore();

  const { users: noOfusers, user, error, loading, success } = authState;

  const { users, numOfPages } = noOfusers;

  let router = useRouter();

  let pageNo = router.query["page"];
  let keyword = router.query["keyword"];

  useEffect(() => {
    let fetchProducts = async () => {
      try {
        authDispatch({ type: "AUTH_LOADING" });
        let { data } = await axios.get(
          `/api/users?page=${pageNo ? pageNo : 1}&keyword=${
            keyword ? keyword : ""
          }`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        authDispatch({ type: "GET_ALL_USERS", payload: data });
      } catch (error) {
        authDispatch({ type: "AUTH_ERROR", payload: error.msg });
      }
    };

    fetchProducts();
  }, [pageNo, keyword]);

  const submitHandler = async (e) => {
    e.preventDefault();

    let search = e.target.value.trim();
    if (search) {
      router.push({
        pathname: "/users",
        query: { page: pageNo ? pageNo : 1, keyword: e.target.value },
      });
    } else {
      router.push("/users?page=1");
    }
  };

  return (
    <div>
      {error ? toast.error(error) : loading ? toast.success("loading") : ""}
      {success ? toast.success("deleted successfully") : ""}
      {users !== [] && (
        <div>
          {" "}
          <div className="flex  flex-col gap-y-3 md:flex-row justify-between items-center px-8">
            <div className="w-1/2 md:w-1/3 mx-auto">
              {" "}
              <form>
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block outline-none p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  focus:ring-purple-500 focus:border-purple-500 dark:bg-purple-700 dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                    placeholder="Search"
                    required
                    onChange={submitHandler}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="bg-gray-50 my-16 w-1/2 mx-auto">
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Serial
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Email
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Role
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((item, k) => {
                      return (
                        <tr
                          key={k}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {k + 1}
                          </th>
                          <th
                            scope="row"
                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item.name}
                          </th>
                          <td className="py-4 px-6">{item.email}</td>
                          <td className="py-4 px-6">
                            {item.isAdmin ? "admin" : "user"}
                          </td>

                          <td className="py-4 px-6">
                            {moment(item.createdAt).format("MMM Do YY")}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <ul className="flex justify-center my-5 -space-x-px">
            <li>
              <a
                href="#"
                className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              {Array.from(Array(numOfPages), (e, i) => {
                return (
                  <Link href={`users?page=${i + 1}`}>
                    <a className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      {" "}
                      {i + 1}
                    </a>
                  </Link>
                );
              })}
            </li>

            <li>
              <a
                href="#"
                className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserTable;
