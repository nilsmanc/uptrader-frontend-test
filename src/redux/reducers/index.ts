import { combineReducers } from 'redux'
import projects from './projects'
import tasks from './tasks'

const reducer = combineReducers({
  projects,
  tasks,
})

export default reducer
