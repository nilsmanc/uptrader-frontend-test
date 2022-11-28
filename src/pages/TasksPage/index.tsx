import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GET_PROJECT_TASKS } from '../../redux/constants'

export const TasksPage = () => {
  const dispatch = useDispatch()
  const id = '63845206d413e897e3890d0c'
  useEffect(() => {
    dispatch({ type: GET_PROJECT_TASKS, payload: id })
  }, [dispatch])
  return <div></div>
}
