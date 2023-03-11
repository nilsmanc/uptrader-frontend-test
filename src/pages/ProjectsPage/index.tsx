import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchProjects } from '../../redux/slices/projects'
import { RootState, useAppDispatch } from '../../redux/store'
import { ProjectType } from '../../types'

import styles from './ProjectsPage.module.scss'

export const ProjectsPage = () => {
  const navigate = useNavigate()

  const handleClick = (id: string) => {
    navigate(`/tasks/${id}`)
  }

  const dispatch = useAppDispatch()
  const projectsData = useSelector((state: RootState) => state.projects)
  const projects = useSelector((state: RootState) => state.projects.items)

  const isProjectsLoading = projectsData.status === 'loading'

  useEffect(() => {
    dispatch(fetchProjects())
  }, [])

  return (
    <div className={styles.list}>
      {isProjectsLoading ? (
        <div>...Loading</div>
      ) : (
        projects.map((project: ProjectType) => (
          <div key={project._id} onClick={() => handleClick(project._id)}>
            {project.title}
          </div>
        ))
      )}
    </div>
  )
}
