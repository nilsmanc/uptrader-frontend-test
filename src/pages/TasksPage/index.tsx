import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import instance from '../../axios'
import { fetchProjectTasks, fetchRemoveTask } from '../../redux/slices/tasks'

import { RootState, useAppDispatch } from '../../redux/store'
import { TaskType } from '../../types'
import styles from './TasksPage.module.scss'

export const TasksPage = () => {
  const navigate = useNavigate()

  const handleClick = (id: string) => {
    navigate(`/task/${id}`)
  }

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const deleteHandler = (id: string) => {
    dispatch(fetchRemoveTask(id))
  }

  const dispatch = useAppDispatch()

  const location = useLocation()

  const id = location.pathname.substring(7)

  const tasks = useSelector((state: RootState) => state.tasks.items)

  const addHandler = async () => {
    try {
      const fields = {
        title,
        description,
        project: id,
      }
      await instance.post('/tasks', fields)
      dispatch(fetchProjectTasks(id))
    } catch (err) {
      console.warn(err)
      alert('Failed to add')
    }
  }

  useEffect(() => {
    dispatch(fetchProjectTasks(id))
  }, [location])

  return (
    <div className={styles.list}>
      {tasks.map((task: TaskType) => (
        <div>
          <div onClick={() => handleClick(task._id)} key={task._id}>
            {task.title}
          </div>
          <button onClick={() => deleteHandler(task._id)}>X</button>
        </div>
      ))}
      <input onChange={(e) => setTitle(e.target.value)} />
      <input onChange={(e) => setDescription(e.target.value)} />
      <button onClick={() => addHandler()}>Add</button>
    </div>
  )
}
