import { useContext, useState } from 'react'
import './index.css'
import Register from './pages/Register'
import "./style.scss"
import Login from './pages/Login'
import Home from './pages/Home'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'

function App() {
  const {currentUser}=useContext(AuthContext);
 console.log(currentUser);

 const ProtectedRoute=({children})=>{
  if(!currentUser) {return <Navigate to="/login"/>}
  //show login alway if there is no currentUser
   return children;
 }


  return (
    <>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <Home />
          </ProtectedRoute>} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
