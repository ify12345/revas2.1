import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './screens/home/index.js';


const App = () => (
  <Router>

    <Routes>

      <Route path="/" element={<Home />} />

    </Routes>
    
  </Router>
)

export default App
