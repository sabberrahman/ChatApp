import { useState } from 'react'
import './index.css'
import Register from './pages/Register'
import "./style.scss"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Register/>
    </>
  )
}

export default App
