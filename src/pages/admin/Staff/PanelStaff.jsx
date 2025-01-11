import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const API_URL = process.env.REACT_APP_API_URL;

const PanelStaff = () => {
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [users, setUsers] = useState([]); // Staff data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  const pageSize = 5; // Number of staff per page

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

            if (user.access === "HR") department = "HR";
            if (user.access === "Admin") department = "Admin";
            if (user.access === "Sales") department = "Sales";

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

  const handleDelete = async (email) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await axios.delete(`${API_URL}/department/delete-employee`, {
          data: { email },
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`,
          },
        });

        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.email !== email)
        );
        alert("Staff member deleted successfully.");
      } catch (error) {
        alert("Failed to delete staff member. Try again.");
      }
    }
  };

  const handleUpdate = (userId) => {
    navigate(`/update-staff/${userId}`);
  };

  const handleAddStaff = () => {
    navigate("/addStaff");
  };

  // Pagination
  const totalPages = Math.ceil(users.length / pageSize);
  const currentPageData = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => setCurrentPage(index + 1)}
        className={`px-3 py-1 rounded ${
          currentPage === index + 1
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-blue-500 hover:bg-blue-100"
        }`}
      >
        {index + 1}
      </button>
    ));
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Staff Management</h2>
        <button
          onClick={handleAddStaff}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Add Staff
        </button>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded shadow p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">#</th>
              <th className="py-2">Name</th>
              <th className="py-2">Department</th>
              <th className="py-2">Email</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((user, index) => (
              <tr key={user._id} className="border-b">
                <td className="py-2">{(currentPage - 1) * pageSize + index + 1}</td>
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.department}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2 flex space-x-3">
                  <button
                    onClick={() => handleUpdate(user.userId)}
                    className="text-yellow-500"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user.email)}
                    className="text-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4 space-x-2">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-blue-500 hover:bg-blue-100"
          }`}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-blue-500 hover:bg-blue-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PanelStaff;
