/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './screens/Signup/index.js'
import Signin from './screens/sign-in/index.js'
import SetUp from './screens/set-up/index.js'
import Dashboard from './screens/Dashboard/index.js'
import LandingPage from './screens/landing/index.js'
import { useAppSelector } from './redux/store.js'
import UsersSignin from './screens/users/sign-in/index.js'
import UsersSignup from './screens/users/sign-up/index.js'
import ForgotPassword from './screens/forgot-password/index.js'

const App = () => {
  const { isAuthenticated, isVerified, user } = useAppSelector(
    store => store.auth
  )

  console.log('logged in', isAuthenticated);
  
  return (
    <Router>
      <Routes>
        {!isAuthenticated && (
          <>
          {/* Admin routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/account-manager/sign-up" element={<Signup />} />
            <Route path="/account-manager/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<UsersSignup />} />
            <Route path="/sign-in" element={<UsersSignin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
           
          </>
        )}
        {isAuthenticated && !isVerified && (
          <> 
            <Route path="/set-up" element={<SetUp />} />
          </>
        )}
        {isAuthenticated && (
          <> 
            <Route path="/" element={<Dashboard />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default App
