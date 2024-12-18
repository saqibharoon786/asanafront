import React, { useEffect, useState } from "react";
import axios from "axios";

const API_ADMIN_URL = process.env.REACT_APP_API_ADMIN_URL;

const PanelDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState("");

  // Fetch departments data from API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        var jwtLoginToken = localStorage.getItem("jwtLoginToken");
        var response = await axios.get(`${API_ADMIN_URL}/department/get-departments`, {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`, // Corrected template literal syntax
          },
        });        
        const departmentData = response.data?.information?.departments || [];
        const validDepartments = departmentData.filter(dept => dept?.department_Name);
        setDepartments(validDepartments);
      } catch (err) {
        setError("Error fetching department data");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [departments]); // Now depends on the 'departments' state

  // Handle opening and closing the drawer
  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Handle department input form changes
  const handleInputChange = (e) => {
    
    setNewDepartmentName(e.target.value); // Update state with new department name
  };

  // Handle form submission to add a new department
const handleAddDepartmentSubmit = async (e) => {
  e.preventDefault();

  if (!newDepartmentName.trim()) {
    setError("Department name cannot be empty.");
    return;
  }

  try {
    const jwtLoginToken = localStorage.getItem("jwtLoginToken");

    // POST request to the server to add a new department
    const response = await axios.post(
      `${API_ADMIN_URL}/department/add-department`,
      {
        department_Name: newDepartmentName, // Payload containing the department name
      },
      {
        headers: {
          Authorization: `Bearer ${jwtLoginToken}`, // Correct placement of headers
        },
      }
    );

    // Assuming the response contains the newly created department
    const newDepartment = response.data.department;

    // Optimistic update: Add the new department to the current list
    setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);

    // Reset the input field and close the drawer
    setNewDepartmentName("");
    handleCloseDrawer();
  } catch (err) {
    setError("Error adding department");
    console.error("Failed to add department:", err); // Log the error for debugging
  }
};


  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter departments based on the search input
  const filteredDepartments = departments.filter((dept) =>
    dept?.department_Name?.toLowerCase().includes(search.toLowerCase())
  );

  // Get the total number of departments (filtered or unfiltered)
  const totalDepartments = filteredDepartments.length;

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-100 via-blue-50 to-gray-200">
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
            Departments Management
          </h1>

          <button
            onClick={handleOpenDrawer}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            + Add Department
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md hover:shadow-lg transition-all rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700">Total Departments</h2>
            <p className="text-5xl font-extrabold text-blue-600 mt-3">{totalDepartments}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <input
            type="text"
            placeholder="🔍 Search departments..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Department List */}
        {filteredDepartments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((dept) => (
              <div
                key={dept.department_Name}
                className="bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedDepartment(dept)}
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{dept.department_Name}</h2>
                <p className="text-lg text-gray-600">
                  👥 Employees:{" "}
                  <span className="font-bold text-gray-800">{dept.employees?.length || 0}</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            <p>No departments found.</p>
          </div>
        )}
      </div>

      {/* Drawer for Adding Department */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 md:w-2/3 lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Add New Department</h2>
            <form onSubmit={handleAddDepartmentSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="department_Name"
                  className="block text-lg font-semibold text-gray-700"
                >
                  Department Name
                </label>
                <input
                  type="text"
                  id="department_Name"
                  name="department_Name"
                  value={newDepartmentName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Add
              </button>
            </form>
            <button
              onClick={handleCloseDrawer}
              className="mt-4 w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Department Details Modal */}
      {selectedDepartment && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 md:w-2/3 lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {selectedDepartment.department_Name} - Employees
            </h2>
            <ul className="space-y-2">
              {selectedDepartment.employees?.length > 0 ? (
                selectedDepartment.employees.map((emp, index) => (
                  <li
                    key={emp._id || index}
                    className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
                  >
                    <div className="text-lg font-medium text-gray-800">{emp.employee_Name || "N/A"}</div>
                    <div className="text-gray-600">{emp.employee_Position || "N/A"}</div>
                    <div className="text-sm text-gray-500">{emp.employee_Contact || "No contact"}</div>
                  </li>
                ))
              ) : (
                <li className="p-4 text-gray-500">No employees found in this department.</li>
              )}
            </ul>
            <button
              onClick={() => setSelectedDepartment(null)}
              className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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
