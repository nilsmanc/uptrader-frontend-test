import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = (preloadedState: any) =>
  createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(sagaMiddleware)))

const store = configureStore({})

sagaMiddleware.run(rootSaga)

export default store
