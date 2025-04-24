/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/redux/reducers/auth'
import { jwtDecode } from 'jwt-decode'
import { persistor, useAppSelector } from '@/redux/store'
import { showToast } from '@/components/Toast'

interface DecodedToken {
  exp: number
  [key: string]: any // For other claims in the token
}

// Component to handle token expiration
export default function TokenExpirationHandler() {
  const dispatch = useDispatch()
  //   const navigation = useNavigation();
  const { isAuthenticated } = useAppSelector(state => state.auth)

  useEffect(() => {
    let tokenExpirationTimer: NodeJS.Timeout | undefined

    const checkTokenExpiration = async () => {
      try {
       
        const token = localStorage.getItem('revas')

        if (token) {
         
          const decodedToken = jwtDecode<DecodedToken>(token)
          const expirationTime = decodedToken.exp * 1000
          const currentTime = Date.now()

          if (expirationTime > currentTime) {
            
            const timeRemaining = expirationTime - currentTime
            console.log(`Token expires in ${timeRemaining / 1000} seconds`)

           
            if (tokenExpirationTimer) {
              clearTimeout(tokenExpirationTimer)
            }
            tokenExpirationTimer = setTimeout(() => {
              handleLogout()
            }, timeRemaining)
          } else {

            handleLogout()
          }
        }
      } catch (error) {
        console.error('Error checking token expiration:', error)
      }
    }

    const handleLogout = async () => {
      localStorage.removeItem('revas')

      dispatch(logout())

      persistor.purge()
      showToast({
        type: 'error',
        msg: 'Your session has expired. Please log in again.',
      })
    }

    // Only run the check if the user is authenticated
    if (isAuthenticated) {
      checkTokenExpiration()
    }

    // Clean up the timer when the component unmounts
    return () => {
      if (tokenExpirationTimer) {
        clearTimeout(tokenExpirationTimer)
      }
    }
  }, [isAuthenticated, dispatch])

  // This is a utility component, so it doesn't render anything
  return null
}
