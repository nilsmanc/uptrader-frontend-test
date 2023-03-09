import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchProjectTasks } from '../../redux/slices/tasks'

import { RootState, useAppDispatch } from '../../redux/store'
import { TaskType } from '../../types'
import styles from './TasksPage.module.scss'

export const TasksPage = () => {
  const dispatch = useAppDispatch()

  const { state } = useLocation()
  const { id } = state

  const tasks = useSelector((state: RootState) => state.tasks.items)

  useEffect(() => {
    dispatch(fetchProjectTasks(id))
  }, [])

  return (
    <div className={styles.boards}>
      {tasks.map((task: TaskType) => (
        <div key={task._id}>{task.title}</div>
      ))}
    </div>
  )
}
