import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { commentsReducer } from './slices/comments'
import { projectsReducer } from './slices/projects'
import { tasksReducer } from './slices/tasks'

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    comments: commentsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
