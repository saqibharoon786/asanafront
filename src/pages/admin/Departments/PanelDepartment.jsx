import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const API_URL = process.env.REACT_APP_API_URL;

const PanelDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Pagination for employees
  const EMPLOYEES_PER_PAGE = 10; // Number of employees per page

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const jwtLoginToken = localStorage.getItem("jwtLoginToken");
        const response = await axios.get(`${API_URL}/department/get-departments`, {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`,
          },
        });
        const departmentData = response.data?.information?.departments || [];
        const validDepartments = departmentData.filter((dept) => dept?.department_Name);
        setDepartments(validDepartments);
      } catch (err) {
        setError("Error fetching department data");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleSearchChange = (event) => setSearch(event.target.value);

  const filteredDepartments = departments.filter((dept) =>
    dept?.department_Name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalDepartments = filteredDepartments.length;

  const paginateEmployees = (employees) => {
    const startIndex = (currentPage - 1) * EMPLOYEES_PER_PAGE;
    const endIndex = startIndex + EMPLOYEES_PER_PAGE;
    return employees.slice(startIndex, endIndex);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (selectedDepartment?.employees?.length > currentPage * EMPLOYEES_PER_PAGE) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="🔍 Search departments..."
            value={search}
            onChange={handleSearchChange}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Department List View */}
        {filteredDepartments.length > 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">#</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Department Name</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Employees</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartments.map((dept, index) => (
                  <tr key={dept.department_Name} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800">{index + 1}</td>
                    <td className="px-4 py-3 text-gray-800">{dept.department_Name}</td>
                    <td className="px-4 py-3 text-gray-800">{dept.employees?.length || 0}</td>
                    <td className="px-4 py-3 text-gray-800">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedDepartment(dept);
                            setCurrentPage(1); // Reset to first page
                          }}
                          className="text-blue-400 hover:text-blue-700"
                          title="View Department"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => console.log("Edit department:", dept)}
                          className="text-blue-400 hover:text-blue-700"
                          title="Edit Department"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this department?")) {
                              console.log("Delete department:", dept);
                            }
                          }}
                          className="text-red-500 hover:text-red-600"
                          title="Delete Department"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">No departments found.</div>
        )}
      </div>

      {/* Department Details Modal */}
      {selectedDepartment && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 md:w-2/3 lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedDepartment.department_Name} - Employees
            </h2>
            <ul className="space-y-2">
              {selectedDepartment.employees?.length > 0 ? (
                paginateEmployees(selectedDepartment.employees).map((emp, index) => (
                  <li
                    key={emp._id || index}
                    className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
                  >
                    <div className="text-lg font-medium text-gray-800">{emp.employee_Name || "N/A"}</div>
                    <div className="text-gray-600">{emp.employee_Position || "N/A"}</div>
                  </li>
                ))
              ) : (
                <li className="p-4 text-gray-500">No employees found in this department.</li>
              )}
            </ul>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousPage}
                className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={currentPage === 1}
              >
                <FaArrowLeft /> Previous
              </button>
              <button
                onClick={handleNextPage}
                className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition ${
                  selectedDepartment.employees?.length <= currentPage * EMPLOYEES_PER_PAGE
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={selectedDepartment.employees?.length <= currentPage * EMPLOYEES_PER_PAGE}
              >
                Next <FaArrowRight />
              </button>
            </div>
            <button
              onClick={() => setSelectedDepartment(null)}
              className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelDepartment;
