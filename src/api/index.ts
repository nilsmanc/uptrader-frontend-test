import instance from '../axios'

// export const getProjects = async () => {
//   const request = await fetch('http://localhost:4444/projects')

//   return await request.json()
// }

export const getProjects = async () => {
  const { data } = await instance.get('/projects')
  console.log(data)
  return { data }
}
