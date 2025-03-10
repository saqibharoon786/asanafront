import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import {
  Briefcase,
  ChevronDown,
  Logs,
  ClipboardList,
  Calendar,
  Activity,
  Columns,
} from "lucide-react";

const ProjectNavbar = ({ onSelectPage }) => {
  const { projectId } = useParams(); // Get project ID from URL params
  const [currentProject, setCurrentProject] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to toggle modal visibility

  useEffect(() => {
    if (!projectId) return; // Ensure projectId is available

    const fetchProject = async () => {
      try {
        const jwtLoginToken = localStorage.getItem("jwtLoginToken"); // Get JWT token from localStorage

        if (!jwtLoginToken) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          `http://localhost:3000/project/getbyid/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`, // Send JWT token in request headers
            },
          }
        );

        setCurrentProject(
          response.data.project.project_Name || "Unknown Project"
        );
        console.log("Project data:", response.data);
      } catch (err) {
        console.error("Axios error:", err);
        setError("Failed to load project. Please check your authentication.");
      }
    };

    fetchProject();
  }, [projectId]); // Re-run effect when projectId changes

  // Toggle Modal Visibility
  const toggleModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      <header className="bg-white flex justify-between items-center py-2 px-6">
        <div className="flex items-center space-x-2 text-gray-700">
          <div className="bg-teal-500 p-2 rounded-lg">
            <Briefcase className="text-teal-50" />
          </div>
          <h2 className="text-gray-800 text-xl font-semibold">
            {error ? error : currentProject}
          </h2>
          <button className="p-1 rounded-md hover:bg-white/10 hover:text-gray-800">
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

        {/* Share Button with Modal Toggle */}
        <button
          onClick={toggleModal}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Share
        </button>
      </header>

      {/* Modal for Share */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Share Project</h2>
              <button
                onClick={toggleModal} // Close Modal
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="font-bold text-xl">&times;</span>
              </button>
            </div>

            {/* Form Content */}
            <div className="mt-4">
              <label className="block text-gray-700">Invite with email</label>
              <input
                type="email"
                placeholder="Add members by name or email..."
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
              <select
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
              <div className="mt-2 flex items-center space-x-2">
                <input type="checkbox" />
                <label className="text-gray-600">
                  Notify when tasks are added to the project
                </label>
              </div>
              <button
                onClick={() => console.log("Invite sent")}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Invite
              </button>
            </div>

            {/* Access Settings */}
            <div className="mt-4">
              <label className="block text-gray-700">Access settings</label>
              <select className="mt-2 p-2 w-full border border-gray-300 rounded-md">
                <option value="My workspace">My workspace</option>
                <option value="Other Workspace">Other Workspace</option>
              </select>
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={toggleModal} // Close Modal
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="bg-white pt-6 px-6 text-gray-700">
        <div className="flex space-x-4">
          <Link
            to={`/project/${projectId}/list`}
            className="flex items-center space-x-1 p-1.5 hover:bg-gray-100 hover:text-gray-800"
          >
            <Logs className="w-6 h-6" />
            <span>List</span>
          </Link>
          <Link
            to="/overview"
            className="flex items-center space-x-1 p-1.5 hover:bg-gray-100 hover:text-gray-800"
          >
            <ClipboardList className="w-6 h-6" />
            <span>Overview</span>
          </Link>
          <Link
            to="/board"
            className="flex items-center space-x-1 p-1.5 hover:bg-gray-100 hover:text-gray-800"
          >
            <Columns className="w-6 h-6" />
            <span>Board</span>
          </Link>
          <Link
            to="/timeline"
            className="flex items-center space-x-1 p-1.5 hover:bg-gray-100 hover:text-gray-800"
          >
            <Calendar className="w-6 h-6" />
            <span>Timeline</span>
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center space-x-1 p-1.5 hover:bg-gray-100 hover:text-gray-800"
          >
            <Activity className="w-6 h-6" />
            <span>Dashboard</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default ProjectNavbar;
