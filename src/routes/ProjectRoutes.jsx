import React from "react";
import { Route } from "react-router-dom";
import {
  NewProject,
  ProjectPannel,
  ProjectDashboard,
  TaskPannel,
  ProjectOverview,
  ProjectList,
  ProjectForm,
  Home,
  ProjectShare,
  ProjectGoals,
  ProjectGoalPannel,
  ProjectGoalUpdateStatus,
  ProjectTeamGoal
} from "../pages/Project/Projectpages";
import MainLayout from "../layouts/Project/MainLayout";
import ProjectNavbar from "../components/ProjectNavbar";
import { ProjectProtectedRoutes} from "../utils/protectedRoutes/ProtectedRoutes";
import ProjectLayout from "../components/ProjectLayout";


const   ProjectRoutes = () => {
  return (
    <>

<Route path="/home" element={<ProjectProtectedRoutes><MainLayout><Home /></MainLayout></ProjectProtectedRoutes>} />
<Route path="/new-project"element={<ProjectProtectedRoutes><NewProject/></ProjectProtectedRoutes>} />
<Route path="/project-form"element={<ProjectProtectedRoutes><ProjectForm/></ProjectProtectedRoutes>} />
<Route path="/project/:projectId"element={  <ProjectProtectedRoutes>  <MainLayout>  <ProjectNavbar/>  </MainLayout>  </ProjectProtectedRoutes>}/>
<Route path="/project/:projectId/list"element={  <ProjectProtectedRoutes>  <MainLayout>  <ProjectLayout><ProjectList/></ProjectLayout> </MainLayout>  </ProjectProtectedRoutes>}/>
<Route path="/overview" element={  <ProjectProtectedRoutes>  <MainLayout>  <ProjectLayout><ProjectOverview/></ProjectLayout> </MainLayout>  </ProjectProtectedRoutes>}/>
<Route path="/Dashboard" element={  <ProjectProtectedRoutes>  <MainLayout>  <ProjectLayout><ProjectDashboard/></ProjectLayout> </MainLayout>  </ProjectProtectedRoutes>}/>
<Route path="/goals" element={  <ProjectProtectedRoutes>  <MainLayout>  <ProjectGoals/> </MainLayout>  </ProjectProtectedRoutes>}/>
<Route path="/goal/:goalId" element={<ProjectProtectedRoutes><MainLayout><ProjectGoalPannel/></MainLayout></ProjectProtectedRoutes>} />
<Route path="/goalUpdateStatus/:goalId" element={<ProjectProtectedRoutes><ProjectGoalUpdateStatus/></ProjectProtectedRoutes>} />
<Route path="/Team-goal" element={<ProjectProtectedRoutes><MainLayout><ProjectTeamGoal/></MainLayout></ProjectProtectedRoutes>} />






    </>
  );
};

export default ProjectRoutes;
