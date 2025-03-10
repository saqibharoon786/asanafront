import React from 'react'
import ProjectNavbar from './ProjectNavbar'

const ProjectLayout = ({children}) => {
  return (
    <div>
        <div><ProjectNavbar/></div>
        <div>{children}</div>

    </div>
  )
}

export default ProjectLayout