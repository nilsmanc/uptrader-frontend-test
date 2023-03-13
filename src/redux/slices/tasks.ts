import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import instance from '../../axios'
import { TasksSliceState, TaskType } from '../../types'

export const fetchTask = createAsyncThunk<TaskType, string>('tasks/fetchTask', async (id) => {
  const { data } = await instance.get(`/tasks/${id}`)
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
  item: {} as TaskType,
  status: 'loading',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTask.pending, (state) => {
      state.item = {} as TaskType
      state.status = 'loading'
    })
    builder.addCase(fetchTask.fulfilled, (state, action: PayloadAction<any>) => {
      state.item = action.payload
      state.status = 'loaded'
    })
    builder.addCase(fetchTask.rejected, (state) => {
      state.item = {} as TaskType
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
