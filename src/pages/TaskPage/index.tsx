import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { RootState, useAppDispatch } from '../../redux/store'
import { fetchTask } from '../../redux/slices/tasks'
import { useSelector } from 'react-redux'

import styles from './TaskPage.module.scss'

export const TaskPage = () => {
  const location = useLocation()

  const id = location.pathname.substring(6)

  const dispatch = useAppDispatch()

  const taskItem = useSelector((state: RootState) => state.tasks.items)

  console.log(taskItem)

  useEffect(() => {
    dispatch(fetchTask(id))
  }, [])

  return <div className={styles.item}>{taskItem.title}</div>
}
