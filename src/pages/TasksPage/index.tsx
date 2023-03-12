import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchProjectTasks } from '../../redux/slices/tasks'

import { RootState, useAppDispatch } from '../../redux/store'
import { TaskType } from '../../types'
import styles from './TasksPage.module.scss'

export const TasksPage = () => {
  const navigate = useNavigate()

  const handleClick = (id: string) => {
    navigate(`/task/${id}`)
  }

  const dispatch = useAppDispatch()

  const location = useLocation()

  const id = location.pathname.substring(7)

  const tasks = useSelector((state: RootState) => state.tasks.items)

  useEffect(() => {
    dispatch(fetchProjectTasks(id))
  }, [location])

  return (
    <div className={styles.list}>
      {tasks.map((task: TaskType) => (
        <div onClick={() => handleClick(task._id)} key={task._id}>
          {task.title}
        </div>
      ))}
    </div>
  )
}
