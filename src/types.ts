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
  project: string
  priority: string
  status: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}
