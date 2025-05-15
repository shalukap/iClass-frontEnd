import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes path="/*">
      <Route path='/' element={<h1>Login</h1>}/>
      <Route path='/admin/*' element={<Dashboard/>}/>
      <Route path='/*' element={<h1>Error</h1>}/>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App
