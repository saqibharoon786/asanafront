import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaUser } from "react-icons/fa";

const API_URL = process.env.REACT_APP_API_URL;

const PanelStaff = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingEmail, setDeletingEmail] = useState(null);
  const navigate = useNavigate();
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/department/get-employees`,
          {
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`,
            },
          }
        );

        const enrichedUsers = response.data.information.users
          .filter((user) => !user.deleted)
          .map((user) => {
            let department = "Unknown";

            if (user.access === "HR") {
              department = "HR";
            } else if (user.access === "Admin") {
              department = "Admin";
            } else if (user.access === "Sales") {
              department = "Sales";
            }

            return {
              ...user,
              department,
            };
          });

        setUsers(enrichedUsers);
      } catch (err) {
        setError("Error fetching staff data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [jwtLoginToken]);

  // Handle delete action
  const handleDelete = async (email) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        setDeletingEmail(email);

        const response = await axios.delete(
          `${API_URL}/department/delete-employee`,
          {
            data: { email },
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`,
            },
          }
        );

        if (response.status === 200) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.email !== email)
          );
          alert("Staff member deleted successfully.");
        } else {
          throw new Error(
            response.data.message || "Failed to delete the staff member."
          );
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "An error occurred. Please try again later.";
        alert(errorMessage);
      } finally {
        setDeletingEmail(null);
      }
    }
  };

  // Handle update action
  const handleUpdate = (userId) => {
    console.log(userId);
    navigate(`/update-staff/${userId}`);
  };

  const handleAddStaff = () => {
    navigate("/addStaff");
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          (user.name?.toLowerCase() || "").includes(
            search.toLowerCase().trim()
          ) ||
          (user.email?.toLowerCase() || "").includes(
            search.toLowerCase().trim()
          )
      ),
    [users, search]
  );

  const totalUsersCount = users.length;

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="p-6 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-lg shadow-md text-center">
            <FaUser className="text-4xl mb-2" />
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-4xl font-bold">{totalUsersCount}</p>
          </div>
        </div>

        <button
          onClick={handleAddStaff}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
          Add New Staff
        </button>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-6">
          <div className="p-4 border-b bg-gray-100">
            <input
              type="text"
              placeholder="Search staff..."
              value={search}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {filteredUsers.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Created At</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors border-b last:border-none"
                  >
                    <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {user.department}
                    </td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {user.createdAt}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {/* Update Button */}
                      <button
                        onClick={() => handleUpdate(user.userId)}
                        className="p-2 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 transition"
                      >
                        <FaEdit />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(user.email)}
                        className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-4 text-center text-gray-500">No staff found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PanelStaff;
