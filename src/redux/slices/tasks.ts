import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import instance from '../../axios'
import { TasksSliceState, TaskType } from '../../types'

export const fetchTasks = createAsyncThunk<Array<TaskType>>('tasks/fetchTasks', async () => {
  const { data } = await instance.get('/tasks')
  return data
})

export const fetchProjectTasks = createAsyncThunk<Array<TaskType>, string>(
  'tasks/fetchProjectTasks',
  async (id) => {
    const { data } = await instance.get(`/tasks/project/${id}`)
    return data
  },
)

export const fetchRemoveTask = createAsyncThunk<void, string>('tasks/fetchRemoveTask', async (id) =>
  instance.delete(`/tasks/${id}`),
)

const initialState: TasksSliceState = {
  items: [],
  status: 'loading',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.items = []
      state.status = 'loading'
    })
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'loaded'
    })
    builder.addCase(fetchTasks.rejected, (state) => {
      state.items = []
      state.status = 'error'
    })
    builder.addCase(fetchProjectTasks.pending, (state) => {
      state.items = []
      state.status = 'loading'
    })
    builder.addCase(fetchProjectTasks.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'loaded'
    })
    builder.addCase(fetchProjectTasks.rejected, (state) => {
      state.items = []
      state.status = 'error'
    })
    builder.addCase(fetchRemoveTask.pending, (state, action) => {
      state.items = state.items.filter((obj: TaskType) => obj._id !== action.meta.arg)
    })
  },
})

export const tasksReducer = tasksSlice.reducer
