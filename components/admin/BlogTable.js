import React from "react";

function BlogTable() {
  return (
    <>
      <div className="flex  flex-col gap-y-3 md:flex-row justify-between items-center px-8">
        <div className="w-1/2 md:w-1/3">
          {" "}
          <form>
            <label
              for="default-search"
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
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/2 md:w-1/3">
          <select
            id="countries_disabled"
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          >
            <option selected>Select Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="bg-gray-50 min-h-screen ">
        <div>
          <div className="p-4">
            <div className="bg-white p-4 rounded-md">
              <div>
                <h2 className="mb-4 text-xl font-bold text-gray-700">
                  Blog List
                </h2>
                <div>
                  <div>
                    <div className="flex justify-between bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md ">
                      <div>
                        <span>Serial</span>
                      </div>
                      <div>
                        <span>Blog</span>
                      </div>
                      <div>
                        <span>Status</span>
                      </div>
                      <div>
                        <span>Time</span>
                      </div>
                      <div>
                        <span>Author</span>
                      </div>
                      <div>
                        <span>Delete</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center border-t my-2 text-sm font-normal mt-4 space-x-4">
                        <div className="px-2 flex">
                          <span>John Deo</span>
                        </div>

                        <div>
                          <span>johndeo@gmail.com</span>
                        </div>
                        <div className="px-2">
                          <span>Admin</span>
                        </div>
                        <div className="px-2">
                          <span>28/12/2021</span>
                        </div>
                        <div className="px-2">
                          <select>
                            <option>Admin</option>
                            <option>User</option>
                          </select>
                        </div>
                        <div className="px-2">
                          <button className="border border-red-500 p-2 px-4 bg-red-600 hover:bg-red-800 text-white mt-3">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogTable;
