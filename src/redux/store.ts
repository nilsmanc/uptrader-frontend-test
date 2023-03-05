import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { projectsReducer } from './slices/projects'

const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
