import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import BlogTable from "../../components/admin/BlogTable";
import UserTable from "../../components/UserTable";
import { useAuthStore } from "../../contextApi/UserContext";

function Users() {
  //user check
  const { authState } = useAuthStore();
  const router = useRouter();
  const { user, loading, error } = authState;

  //check if it is admin
  useEffect(() => {
    if (user) {
      if (user.info.isAdmin === false) {
        router.push("/");
      }
    }
  }, [user]);

  const [adminNo, setAdminNo] = useState(0);
  const [userNo, setUserNo] = useState(0);

  useEffect(() => {
    const getFunc = async () => {
      let admin = await axios.get(`/api/users/getUsers`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setAdminNo(admin.data);

      let users = await axios.get(`/api/users/getAdmin`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUserNo(users.data);
    };

    getFunc();
  }, []);

  return (
    <div>
      {" "}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Keep em Posting eh !!!
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Knowledge is best used when shared with others. Give your best.
            </p>
          </div>

          <div className="flex justify-center flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className="text-5xl text-gray-900 font-medium title-font mb-2">
                  {adminNo.length}
                </h2>
                <p className="leading-relaxed text-base">Admins</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="text-5xl text-gray-900 font-medium title-font mb-2">
                  {userNo.length}
                </h2>
                <p className="leading-relaxed text-base">Users</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <UserTable />
    </div>
  );
}

export default Users;
