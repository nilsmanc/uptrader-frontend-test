import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import instance from '../../axios'
import { fetchProjectTasks, fetchRemoveTask } from '../../redux/slices/tasks'
import { RootState, useAppDispatch } from '../../redux/store'
import { TaskType } from '../../types'

import styles from './TasksPage.module.scss'

export const TasksPage: React.FC = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const location = useLocation()

  const id = location.pathname.substring(7)

  const tasksData = useSelector((state: RootState) => state.tasks)
  const tasks = useSelector((state: RootState) => state.tasks.items)

  const isTasksLoading = tasksData.status === 'loading'

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [taskInputs, showTaskInputs] = useState(false)

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

  const handleClick = (id: string) => {
    navigate(`/task/${id}`)
  }

  const deleteHandler = (id: string) => {
    dispatch(fetchRemoveTask(id))
  }

  useEffect(() => {
    dispatch(fetchProjectTasks(id))
  }, [location])

  return (
    <div className={styles.list}>
      {isTasksLoading ? (
        <div>...Loading</div>
      ) : (
        tasks.map((task: TaskType) => (
          <div className={styles.item}>
            <div onClick={() => handleClick(task._id)} key={task._id}>
              {task.title}
            </div>
            <button className={styles.button} onClick={() => deleteHandler(task._id)}>
              X
            </button>
          </div>
        ))
      )}
      <hr />
      {taskInputs ? (
        <div className={styles.addTask}>
          Add Task
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className={styles.button} onClick={() => addHandler()}>
            Add
          </button>
        </div>
      ) : (
        <button className={styles.button} onClick={() => showTaskInputs(true)}>
          Add Task
        </button>
      )}
    </div>
  )
}
