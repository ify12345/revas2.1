import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './screens/home/Home'
import StyleScope from '@/screens/StyleScope'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/styles" element={<StyleScope/>} />
    </Routes>
  </Router>
)

export default App
