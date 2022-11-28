import instance from '../axios'

export const getProjects = async () => {
  const { data } = await instance.get('/projects')
  return { data }
}

export const getProjectTasks = async (id: string) => {
  const { data } = await instance.get(`/tasks/project/${id}`)
  return { data }
}
