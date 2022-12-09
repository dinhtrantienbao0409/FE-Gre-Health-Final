import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Footer from "components/LandingPage/Footer";
import { getAllUsers } from "services/Auth";
import AdminLayout from "layouts/admin.layouts";
import TableBody from "components/HomePage/TableBody";

export default function AdminViewUserPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  console.log(
    "🚀 ~ file: ViewUsersPage.js ~ line 20 ~ AdminViewUserPage ~ users",
    users
  );

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      console.log(
        "🚀 ~ file: ViewUsersPage.js ~ line 28 ~ fetchUsers ~ response",
        response
      );
      setUsers(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewUsersPage.js ~ line 26 ~ fetchUsers ~ error",
        error
      );
    }
  };

  const handleClick = () => {
    navigate("/admin/createUser");
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <Outlet />
      <div className="mx-auto flex items-center justify-center max-w-7xl px-4 sm:px-6 lg:px-8 py-48">
        <div className=" p-10 shadow-xl w-full space-y-8 gap-5 rounded-lg">
          <button
            onClick={() => handleClick()}
            className="w-1/4 mx-2 group  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
          >
            Create User
          </button>

          <table class="w-full text-sm text-left  ">
            <TableBody data={users} button1={"Update"} button2={"Delete"} />
          </table>
        </div>
      </div>
      <AdminLayout />
      <Footer />
    </div>
  );
}
