import { takeEvery, put, call } from '@redux-saga/core/effects'
import { GET_PROJECTS } from '../constants'
import { getProjects } from '../../api'
import { setProjects } from '../actions/actionCreator'

export function* handleProjects() {
  const { data } = yield call(getProjects)
  yield put(setProjects(data))
}

export function* watchProjectsSaga() {
  yield takeEvery(GET_PROJECTS, handleProjects)
}

export default function* rootSaga() {
  yield watchProjectsSaga()
}
