import { useState } from 'react'
import './index.css'
import Register from './pages/Register'
import "./style.scss"
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Home/>
    </>
  )
}

export default App
