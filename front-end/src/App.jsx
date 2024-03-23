import React from 'react'
import Navbar from './components/Navbar'
import { useState } from 'react'
import Profile from "./pages/Profile"
import Generator from "./pages/Generator"
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"



import './App.css'

function App() {

  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/generator" element={<Generator />} />
        </Routes>
      
    </>
  )
}

export default App
