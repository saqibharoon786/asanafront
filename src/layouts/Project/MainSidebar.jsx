import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Sidebar({ sidbar }) {
  const [projects, setProjects] = useState([]); // Store projects
  const [jwtLogintoken, setJwtLoginToken] = useState(""); 
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  // ✅ Retrieve stored token & Fetch Projects
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtLoginToken");

    if (jwtToken) {
      setJwtLoginToken(jwtToken);
      fetchProjects(jwtToken);
    } else {
      setError("No Authorization Token found");
    }
  }, []);

  const fetchProjects = async (token) => {
    try {
      const response = await axios.get("http://localhost:3000/project/get-user-project-by-id", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      // ✅ Ensure response.data.projects exists and is an array
      if (Array.isArray(response.data.projects)) {
        setProjects(response.data.projects);
      } else {
        setProjects([]); // Ensure projects state is empty
        setError("No projects available"); // Set error message for empty state
      }
    } catch (error) {
      console.error("Error fetching projects:", error.message);
      setError("Failed to fetch projects");
      setProjects([]); // Ensure projects state doesn't break UI
    }
  };
  

  // ✅ Toggle Popup on Clicking Plus Icon
  const handlePopupToggle = () => {
    setShowPopup((prev) => !prev);
  };

  // ✅ Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    }

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  return (
    <div className="text-sm flex text-white relative h-screen">
      <div
        className={`pt-10 py-2 bg-[#2E2E30] space-y-8 md:flex flex-col h-full overflow-y-auto outline outline-1 outline-[#424244] ${
          sidbar ? "w-[64px]" : "w-60"
        } transition-all duration-300 ease-in-out`}
      >
        {/* ✅ Create Button */}
        <div className="Top">
          <div className="flex mx-2 rounded-lg cursor-pointer">
            <div
              className={`rounded-full px-2 py-1 hover:bg-[#2E2E30] bg-[#3D3E40] outline-1 outline-white outline ${
                sidbar ? "outline-0 bg-[#2E2E30]" : ""
              }`}
            >
              <i className="fa-solid fa-plus bg-[#FF584A] p-1 rounded-full cursor-pointer hover:bg-[#fc6f62]"></i>
              <span className={`text-white px-2 ${sidbar ? "hidden" : ""}`}>Create</span>
            </div>
          </div>

          {/* ✅ Home & My Tasks */}
          <div className="space-y-1 mt-5">
            <Link to="/home" className="hover:bg-[#3D3E40] py-2 px-3 mx-2 rounded-lg flex items-center">
              <i className="fa-solid fa-house"></i>
              <span className={`ml-2 ${sidbar ? "hidden" : ""}`}>Home</span>
            </Link>

            <Link to="/goals" className="hover:bg-[#3D3E40] py-2 px-3 mx-2 rounded-lg flex items-center">
              <i className="fa-regular fa-circle-check"></i>
              <span className={`ml-2 ${sidbar ? "hidden" : ""}`}>Goals</span>
            </Link>


            <Link to="/tasks" className="hover:bg-[#3D3E40] py-2 px-3 mx-2 rounded-lg flex items-center">
              <i className="fa-regular fa-circle-check"></i>
              <span className={`ml-2 ${sidbar ? "hidden" : ""}`}>My Task</span>
            </Link>
          </div>
        </div>

        {/* ✅ Projects Section (Always Visible) */}
        <div className="mt-5">
          <div className="flex justify-between items-center px-3">
            <span className="font-semibold">Projects</span>
            <i
              className="fa-solid fa-plus hover:bg-[#3D3E40] rounded-md p-2 cursor-pointer"
              onClick={handlePopupToggle} // ✅ Toggle on click
            ></i>
          </div>

          {/* Display All Fetched Projects */}
          <div className="mt-2">
  {error ? (
    <p className="text-gray-400 px-3 py-2">{error}</p>
  ) : projects.length > 0 ? (
    projects.map((project) => (
      <Link
        key={project._id}
        to={`/project/${project._id}`}
        className="block text-white py-2 px-3 hover:bg-[#2E2E30] flex items-center"
      >
        <i className="fa-solid fa-folder mr-2"></i>
        <span>{project.project_Name}</span>
      </Link>
    ))
  ) : (
    <p className="text-gray-400 px-3 py-2">No projects found</p>
  )}
</div>

        </div>

        {/* ✅ Popup (New Project) */}
        {showPopup && (
          <div
            ref={popupRef}
            className="absolute top-48 left-48 bg-[#3D3E40] shadow-lg p-4 rounded-md w-48"
            style={{ zIndex: 100 }}
          >
            <Link
              to="/new-project"
              className="block text-white py-2 px-3 hover:bg-[#2E2E30] flex items-center"
              onClick={() => setShowPopup(false)}
            >
              <i className="fa-regular fa-file-lines mr-3"></i>
              <span>New Project</span>
            </Link>
          </div>
        )}

        {/* ✅ Team Section */}
        <div className="mt-5">
          <span className="font-semibold px-3">Team</span>
          <div className="mt-3">
            <Link to="/workspace" className="hover:bg-[#3D3E40] py-2 px-3 mx-2 rounded-lg flex items-center">
              <i className="fa-solid fa-user-group"></i>
              <span className={`ml-2 ${sidbar ? "hidden" : ""}`}>My WorkSpace</span>
            </Link>
          </div>
        </div>

        {/* ✅ Invite Section */}
        <div className="foot absolute bottom-16 left-5 text-white">
          <Link
            to="/invite"
            className={`outline-2 outline-[#565557] px-10 py-2 rounded-md hover:bg-[#39393b] flex items-center ${
              sidbar ? "outline-0 px-0" : "outline"
            }`}
          >
            <i className="fa-regular fa-envelope"></i>
            <span className={`ml-2 ${sidbar ? "hidden" : ""}`}>Invite Teammates</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
