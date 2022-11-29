import { SET_PROJECTS } from '../constants'

const initialState = {
  items: [],
}

const projects = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SET_PROJECTS:
      return {
        ...state,
        items: payload,
      }
    default:
      return state
  }
}

export const selectProjects = (state: any) => {
  return state.projects.items
}

export default projects
