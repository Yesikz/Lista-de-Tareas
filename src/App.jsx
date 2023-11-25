import { useState } from 'react'
import TaskList from './components/TaskList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  const [count, setCount] = useState(0)
 

  return (
    <div className='contenedorapp'>
      <TaskList />
    </div>

  )
}

export default App

