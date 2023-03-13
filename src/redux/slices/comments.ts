import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import instance from '../../axios'
import { CommentsSliceState, CommentType } from '../../types'

export const fetchTaskComments = createAsyncThunk<Array<CommentType>, string>(
  'comments/fetchTaskComments',
  async (id) => {
    const { data } = await instance.get(`/comments/task/${id}`)
    return data
  },
)

export const fetchRemoveComment = createAsyncThunk<void, string>(
  'comments/fetchRemoveComment',
  async (id) => instance.delete(`/comments/${id}`),
)

const initialState: CommentsSliceState = {
  items: [],
  status: 'loading',
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTaskComments.pending, (state) => {
      state.items = []
      state.status = 'loading'
    })
    builder.addCase(fetchTaskComments.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'loaded'
    })
    builder.addCase(fetchTaskComments.rejected, (state) => {
      state.items = []
      state.status = 'error'
    })
    builder.addCase(fetchRemoveComment.pending, (state, action) => {
      state.items = state.items.filter((obj: CommentType) => obj._id !== action.meta.arg)
    })
  },
})

export const commentsReducer = commentsSlice.reducer
