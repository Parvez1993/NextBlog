import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthStore } from "../contextApi/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isMember, setIsMember] = useState(true);

  const router = useRouter();

  const { authState, authDispatch } = useAuthStore();

  const { user, error, loading } = authState;

  console.log(error);

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [router, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isMember) {
      if (!email || !password) {
        return window.alert("Fill out all the forms");
      } else {
        authDispatch({ type: "AUTH_LOADING" });
        try {
          const { data } = await axios.post(`/api/users/login`, {
            email,
            password,
          });
          authDispatch({ type: "AUTH_SUCCESS", payload: data });
          localStorage.setItem("userBlogInfo", JSON.stringify(data));
        } catch (err) {
          authDispatch({ type: "AUTH_ERROR", payload: err.message });
        }
        // dispatch(loginUser(email, password));
      }
    } else {
      if (!email || !password || !name) {
        return window.alert("Fill out all the forms");
      } else {
        authDispatch({ type: "AUTH_LOADING" });
        try {
          const { data } = await axios.post(`/api/users/register`, {
            name,
            email,
            password,
          });
          authDispatch({ type: "AUTH_SUCCESS", payload: data });
          localStorage.setItem("userBlogInfo", JSON.stringify(data));
        } catch (err) {
          authDispatch({ type: "AUTH_ERROR", payload: err.message });
        }
        // dispatch(loginUser(email, password));
      }
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center h-screen">
          <div className="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900">
              Welcome to Technology Trip
            </h1>
            <p className="leading-relaxed mt-4">
              This is only for the admins and contributors
            </p>
          </div>

          <div className="lg:w-3/5 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            {error
              ? toast.warn(error)
              : loading
              ? toast.success("Loading wait")
              : ""}
            <ToastContainer />
            {!isMember ? (
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                Sign Up
              </h2>
            ) : (
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                Login
              </h2>
            )}

            {!isMember ? (
              <div className="relative mb-4">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            ) : (
              ""
            )}
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
              onClick={handleSubmit}
            >
              {!isMember ? "Register" : "Sign in"}
            </button>
            {/* if i need to implement registration in future  */}
            <p
              className="text-sm text-gray-500 mt-3"
              onClick={() => setIsMember(!isMember)}
            >
              {isMember ? (
                <span className="text-red-900 cursor-pointer">
                  {" "}
                  Dont have an account? Click here
                </span>
              ) : (
                <span className="text-red-900 cursor-pointer">
                  {" "}
                  Already have an account click here
                </span>
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
