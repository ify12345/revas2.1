import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './screens/home/index.js';
import Signup from './screens/Signup/index.js';
import Signin from './screens/sign-in/index.js';
import SetUp from './screens/set-up/index.js';
import Dashboard from './screens/Dashboard/index.js';


const App = () => (
  <Router>

    <Routes>

      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/sign-up" element={<Signup/>} />
      <Route path="/sign-in" element={<Signin/>} />
      <Route path="/set-up" element={<SetUp/>} />

    </Routes>
    
  </Router>
)

export default App
