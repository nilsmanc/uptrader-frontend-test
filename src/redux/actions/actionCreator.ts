import { GET_PROJECTS, SET_PROJECTS } from '../constants'

export const getProjects = () => ({
  type: GET_PROJECTS,
})

export const setProjects = (payload: any) => ({
  type: SET_PROJECTS,
  payload,
})
