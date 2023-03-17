import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import instance from '../../axios'
import { fetchProjects, fetchRemoveProject } from '../../redux/slices/projects'
import { RootState, useAppDispatch } from '../../redux/store'
import { ProjectType } from '../../types'

import styles from './ProjectsPage.module.scss'

export const ProjectsPage = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [titleInput, showTitleInput] = useState(false)

  const handleClick = (id: string) => {
    navigate(`/tasks/${id}`)
  }

  const dispatch = useAppDispatch()
  const projectsData = useSelector((state: RootState) => state.projects)
  const projects = useSelector((state: RootState) => state.projects.items)

  const isProjectsLoading = projectsData.status === 'loading'

  const addHandler = async () => {
    try {
      const fields = {
        title,
      }
      await instance.post('/projects', fields)
      dispatch(fetchProjects())
    } catch (err) {
      console.warn(err)
      alert('Failed to add')
    }
  }

  const deleteHandler = (id: string) => {
    dispatch(fetchRemoveProject(id))
  }

  useEffect(() => {
    dispatch(fetchProjects())
  }, [])

  return (
    <div className={styles.list}>
      {isProjectsLoading ? (
        <div>...Loading</div>
      ) : (
        projects.map((project: ProjectType) => (
          <div className={styles.item} key={project._id}>
            <div onClick={() => handleClick(project._id)}>{project.title}</div>
            <button className={styles.button} onClick={() => deleteHandler(project._id)}>
              X
            </button>
          </div>
        ))
      )}
      <hr />
      {titleInput ? (
        <div className={styles.addProject}>
          Add Project
          <input
            className={styles.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className={styles.button} onClick={() => addHandler()}>
            Add
          </button>
        </div>
      ) : (
        <button className={styles.button} onClick={() => showTitleInput(true)}>
          Add Project
        </button>
      )}
    </div>
  )
}
