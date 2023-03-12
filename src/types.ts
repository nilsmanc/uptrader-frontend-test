export type ProjectType = {
  title: string
  _id: string
  __v: number
}

export type TaskType = {
  number: string
  title: string
  description: string
  expirationDate: string
  project: ProjectType
  priority: string
  status: string
  _id: string
  createdAt: string
  updatedAt: string
}

export type CommentType = {
  text: string
  task: TaskType
  _id: string
}

export type ProjectsSliceState = {
  items: ProjectType[]
  status: 'loading' | 'loaded' | 'error'
}

export type TasksSliceState = {
  items: TaskType[]
  item: TaskType
  status: 'loading' | 'loaded' | 'error'
}

export type CommentsSliceState = {
  items: CommentType[]
  status: 'loading' | 'loaded' | 'error'
}
