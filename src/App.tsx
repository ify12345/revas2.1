import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './screens/Signup/index.js';
import Signin from './screens/sign-in/index.js';
import SetUp from './screens/set-up/index.js';
import Dashboard from './screens/Dashboard/index.js';
import LandingPage from './screens/landing/index.js';


const App = () => (
  <Router>

    <Routes>

      <Route path="/" element={<LandingPage/>} />
      <Route path="/sign-up" element={<Signup/>} />
      <Route path="/sign-in" element={<Signin/>} />
      <Route path="/set-up" element={<SetUp/>} />
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
    
  </Router>
)

export default App
