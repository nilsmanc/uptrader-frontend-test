import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GET_PROJECTS } from '../../redux/constants'
import { selectProjects } from '../../redux/reducers/projects'
import { ProjectType } from '../../types'

export const ProjectsPage = () => {
  const dispatch = useDispatch()
  const projects = useSelector(selectProjects)
  const navigate = useNavigate()

  const handleClick = (id: string) => {
    console.log(id)
    navigate('/tasks', { state: { id } })
  }

  useEffect(() => {
    dispatch({ type: GET_PROJECTS })
  }, [dispatch])

  return (
    <div>
      {projects.map((project: ProjectType) => (
        <div onClick={() => handleClick(project._id)}>{project.title}</div>
      ))}
    </div>
  )
}
