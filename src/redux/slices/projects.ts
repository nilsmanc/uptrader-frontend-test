import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import instance from '../../axios'
import { ProjectsSliceState, ProjectType } from '../../types'

export const fetchProjects = createAsyncThunk<Array<ProjectType>>(
  'projects/fetchProjects',
  async () => {
    const { data } = await instance.get('/projects')
    return data
  },
)

export const fetchRemoveProject = createAsyncThunk<void, string>(
  'projects/fetchRemoveProject',
  async (id) => instance.delete(`/projects/${id}`),
)

const initialState: ProjectsSliceState = {
  items: [],
  status: 'loading',
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.items = []
      state.status = 'loading'
    })
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'loaded'
    })
    builder.addCase(fetchProjects.rejected, (state) => {
      state.items = []
      state.status = 'error'
    })
    builder.addCase(fetchRemoveProject.pending, (state, action) => {
      state.items = state.items.filter((obj: ProjectType) => obj._id !== action.meta.arg)
    })
  },
})

export const projectsReducer = projectsSlice.reducer
