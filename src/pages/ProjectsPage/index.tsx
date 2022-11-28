import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GET_PROJECTS } from '../../redux/constants'

export const ProjectsPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: GET_PROJECTS })
  }, [dispatch])

  return <div></div>
}
