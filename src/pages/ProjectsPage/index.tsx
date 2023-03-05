import { useNavigate } from 'react-router-dom'
import { ProjectType } from '../../types'

export const ProjectsPage = () => {
  const navigate = useNavigate()

  const handleClick = (id: string) => {
    navigate('/tasks', { state: { id } })
  }

  return (
    <div>
      {[].map((project: ProjectType) => (
        <div onClick={() => handleClick(project._id)}>{project.title}</div>
      ))}
    </div>
  )
}
