import React, { useEffect, useState } from "react";
import { useBlogStore } from "../../contextApi/Blog";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuthStore } from "../../contextApi/UserContext";

function BlogTable() {
  const { blogState, blogDispatch } = useBlogStore();

  const { blogs, error, loading } = blogState;

  let [success, setSuccess] = useState("");

  let [reload, setReload] = useState(false);

  const { authState } = useAuthStore();

  const { user } = authState;

  useEffect(() => {
    let fetchProducts = async () => {
      try {
        blogDispatch({ type: "BLOG_LOADING" });
        let { data } = await axios.get("/api/blogs");
        blogDispatch({ type: "BLOG_SUCCESS", payload: data });
      } catch (error) {
        blogDispatch({ type: "BLOG_ERROR", payload: error.msg });
      }
    };

    fetchProducts();
  }, []);

  let handleDelete = async (id) => {
    try {
      blogDispatch({ type: "BLOG_LOADING" });
      let { data } = await axios.delete(`/api/blogs/admin/editPic/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      blogDispatch({ type: "BLOG_SUCCESS", payload: data });
      setSuccess(true);
      setReload(true);
    } catch (error) {
      blogDispatch({ type: "BLOG_ERROR", payload: error.msg });
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (reload) {
      setReload(false);
      fetchProducts();
    }
  }, [reload, success]);

  return (
    <>
      {error ? toast.error(error) : loading ? toast.success("loading") : ""}
      {success ? toast.success("deleted successfully") : ""}
      {blogs !== [] && (
        <div>
          {" "}
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
                <option value="incomplete">incomplete</option>
                <option value="processing">processing</option>
                <option value="success">success</option>
              </select>
            </div>
          </div>
          <div className="bg-gray-50 min-h-screen my-16">
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Serial
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Blog Title
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Category
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Created
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Edit
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blogs &&
                    blogs.map((item, k) => {
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
                            {item.title}
                          </th>
                          <td className="py-4 px-6">{item.status}</td>
                          <td className="py-4 px-6">{item.category_name}</td>
                          <td className="py-4 px-6">
                            {moment(item.createdAt).format("MMM Do YY")}
                          </td>
                          <td className="py-4 px-6">
                            <Link href={`/admin/${item._id}`}>
                              <a className="bg-green-500 text-center px-3 py-2 border text-white">
                                Edit
                              </a>
                            </Link>
                          </td>
                          <td className="py-4 px-6">
                            <div
                              className="bg-red-500 text-center px-1 py-2 border text-white"
                              onClick={() => {
                                handleDelete(item._id);
                              }}
                            >
                              Delete
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogTable;
