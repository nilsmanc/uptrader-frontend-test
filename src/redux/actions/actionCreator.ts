import { GET_PROJECTS, GET_PROJECT_TASKS, SET_PROJECTS, SET_PROJECT_TASKS } from '../constants'

export const getProjects = () => ({
  type: GET_PROJECTS,
})

export const setProjects = (payload: any) => ({
  type: SET_PROJECTS,
  payload,
})

export const getProjectTasks = () => ({
  type: GET_PROJECT_TASKS,
})

export const setProjectTasks = (payload: any) => ({
  type: SET_PROJECT_TASKS,
  payload,
})
