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
  __v: number
}

export type ProjectsSliceState = {
  items: ProjectType[]
  status: 'loading' | 'loaded' | 'error'
}

export type TasksSliceState = {
  items: TaskType[]
  status: 'loading' | 'loaded' | 'error'
}
