import { SET_PROJECT_TASKS } from '../constants'

const initialState = {
  items: [],
}

const tasks = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SET_PROJECT_TASKS:
      return {
        ...state,
        items: payload,
      }
    default:
      return state
  }
}

export default tasks
