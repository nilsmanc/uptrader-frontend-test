import { Routes, Route } from 'react-router-dom'
import './App.css'
import { ProjectsPage } from './pages/ProjectsPage'
import { TasksPage } from './pages/TasksPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<ProjectsPage />} />
      <Route path='/tasks' element={<TasksPage />} />
    </Routes>
  )
}

export default App
