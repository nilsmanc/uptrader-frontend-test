import { Routes, Route } from 'react-router-dom'
import './App.css'
import { ProjectsPage } from './pages/ProjectsPage'
import { TaskPage } from './pages/TaskPage'
import { TasksPage } from './pages/TasksPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<ProjectsPage />} />
      <Route path='/tasks/:id' element={<TasksPage />} />
      <Route path='/task/:id' element={<TaskPage />} />
    </Routes>
  )
}

export default App
