import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import instance from '../../axios'
import { ProjectSliceState, ProjectType } from '../../types'

export const fetchProjects = createAsyncThunk<Array<ProjectType>>('posts/fetchPosts', async () => {
  const { data } = await instance.get('/posts')
  return data
})

export const fetchRemoveProject = createAsyncThunk<void, string>(
  'posts/fetchRemovePost',
  async (id) => instance.delete(`/posts/${id}`),
)

const initialState: ProjectSliceState = {
  items: [],
  status: 'loading',
}

const projectsSlice = createSlice({
  name: 'posts',
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
