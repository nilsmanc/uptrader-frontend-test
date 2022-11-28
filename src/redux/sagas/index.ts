import { takeEvery, put, call, spawn } from '@redux-saga/core/effects'
import { GET_PROJECTS, GET_PROJECT_TASKS } from '../constants'
import { getProjects, getProjectTasks } from '../../api'
import { setProjects, setProjectTasks } from '../actions/actionCreator'

export function* handleProjects() {
  const { data } = yield call(getProjects)

  yield put(setProjects(data))
}

export function* handleProjectTasks(action: any) {
  const { data } = yield call(getProjectTasks, action.payload)
  yield put(setProjectTasks(data))
}

export function* watchProjectsSaga() {
  yield takeEvery(GET_PROJECTS, handleProjects)
}

export function* watchProjectTasksSaga() {
  yield takeEvery(GET_PROJECT_TASKS, handleProjectTasks)
}

export default function* rootSaga() {
  yield spawn(watchProjectsSaga)
  yield spawn(watchProjectTasksSaga)
}
