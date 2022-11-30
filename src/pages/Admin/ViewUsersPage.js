import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Footer from "components/LandingPage/Footer";
import { getAllUsers } from "services/Auth";

export default function AdminViewUserPage() {
  const tableHeadData = [
    { name: "Email" },
    { name: "Name" },
    { name: "Gender" },
    { name: "Role" },
    { name: "Date of Birth" },
    { name: "Address" },
    { name: "Contact" },
    { name: "Update" },
    { name: "Delete" },
  ];

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
      setUsers(response.data.docs);
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
            // type="submit"
            onClick={() => handleClick()}
            className="w-1/4 mx-2 group  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
          >
            Create User
          </button>
          <table class="w-full text-sm text-left  ">
            <thead class="text-xs uppercase bg-white dark:bg-gray-200 ">
              <tr>
                {tableHeadData.map((item) => (
                  <th scope="col" class="py-3 px-6">
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td class="py-4 px-6">{user.email}</td>
                    <td class="py-4 px-6">{user.name}</td>
                    <td class="py-4 px-6">{user.gender}</td>
                    <td class="py-4 px-6">{user.role}</td>
                    <td class="py-4 px-6">{user.dateOfBirth}</td>
                    <td class="py-4 px-6">{user.address}</td>
                    <td class="py-4 px-6">{user.contact}</td>
                    <td>
                      <button className="  flex justify-center py-2 px-4  text-xs font-medium font-bold rounded-full text-white bg-yellow-400 hover:bg-yellow-300">
                        Update
                      </button>
                    </td>
                    <td>
                      <button className="  flex justify-center py-2 px-4  text-xs font-medium font-bold rounded-full text-white bg-red-500 hover:bg-red-400">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
