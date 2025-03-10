import React, { useState } from "react";
import ProjectNavbar from "../../components/ProjectNavbar";
import ProjectList from "./ProjectList"; // Import the Project List component
import ProjectOverview from "./ProjectOverview";
import ProjectDashboard from "./ProjectDashboard";

const ProjectPannel = () => {
  const [selectedPage, setSelectedPage] = useState("list"); // Default Page

  return (
    <>
      {/* Pass onSelectPage function to ProjectNavbar */}
      <ProjectNavbar onSelectPage={setSelectedPage} />
      <div className="">
        {/* Dynamically Render Content Based on Selected Page */}

        {selectedPage === "list" && <ProjectList  />}
        {selectedPage === "overview" && <ProjectOverview/>}
        {selectedPage === "board" && <h2>Board Section</h2>}
        {selectedPage === "timeline" && <h2>Timeline Section</h2>}
        {selectedPage === "dashboard" && <ProjectDashboard/>}
      </div>
    </>
  );
};

export default ProjectPannel;
