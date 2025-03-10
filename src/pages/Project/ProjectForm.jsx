import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProjectForm() {
  const [projectName, setProjectName] = useState("");
  const [selectedPrivacy, setSelectedPrivacy] = useState("WorkSpace");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [jwtLogintoken, setjwtLoginToken] = useState(""); // Changed to jwtLogintoken

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtLoginToken");
    if (storedToken) {
      setjwtLoginToken(storedToken); // Use jwtLogintoken here
    } else {
      setError("No Authorization Token found");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!projectName.trim()) {
      setError("Project Name is required.");
      return;
    }
  
    setError("");
    setLoading(true);
  
    // ✅ Match backend expected fields
    const projectData = {
      project_Name: projectName,
      project_Privacy: selectedPrivacy, // ✅ Changed from "privacy" to "project_Privacy"
    };
  
    console.log("Sending Request:", projectData); // ✅ Log request data
  
    try {
      const response = await axios.post(
        "http://localhost:3000/project/create-project",
        projectData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtLogintoken}`,
          },
        }
      );
  
      console.log("Response:", response); // ✅ Log full response
  
      if (response.status === 201 || response.status === 200) {
        alert("Project Created Successfully ✅");
        localStorage.setItem("createdProjectName", projectName);
        setProjectName("");
        setSelectedPrivacy("WorkSpace");
        navigate("/home");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error Creating Project:", error);
      console.log("Full Error:", error.response); // ✅ Log detailed error response
  
      setError(error.response?.data?.message || "Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-gray-800 text-white p-4 flex items-start justify-between w-full min-h-screen">
      <div className="w-full max-w-xl p-4">
        <h2 className="text-3xl font-semibold text-gray-100 py-20">
          Add New Project
        </h2>
        <form className="flex flex-col space-y-6 py-3" onSubmit={handleSubmit}>
          <label className="text-lg text-gray-300">Project Name:</label>
          <input
            className="p-2 w-2/3 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-gray-300 outline-none"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <label className="text-lg text-gray-300">Privacy:</label>
          <select
            className="p-2 w-2/3 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-gray-300 outline-none"
            value={selectedPrivacy}
            onChange={(e) => setSelectedPrivacy(e.target.value)}
          >
            <option value="WorkSpace">My workspace</option>
            <option value="Private">Private to members</option>
          </select>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            className="w-2/3 mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
      <div>
        <img
          className="w-full h-auto"
          src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/b74d7cc7e55c806b01707a426441e05449754a02/Updated_Dark_List.png"
          alt="Project Illustration"
        />
      </div>
    </div>
  );
}

export default ProjectForm;
