import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchProjects } from '../../redux/slices/projects'
import { RootState, useAppDispatch } from '../../redux/store'
import { ProjectType } from '../../types'

export const ProjectsPage = () => {
  const navigate = useNavigate()

  const handleClick = (id: string) => {
    navigate('/tasks', { state: { id } })
  }

  const dispatch = useAppDispatch()
  const projectsData = useSelector((state: RootState) => state.projects)
  const projects = useSelector((state: RootState) => state.projects.items)

  const isProjectsLoading = projectsData.status === 'loading'

  useEffect(() => {
    dispatch(fetchProjects())
  }, [])

  return (
    <div>
      {isProjectsLoading ? (
        <div>...Loading</div>
      ) : (
        projects.map((project: ProjectType) => (
          <div onClick={() => handleClick(project._id)}>{project.title}</div>
        ))
      )}
    </div>
  )
}
