import { StrictMode } from 'react'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { ThemeProvider } from '@mui/material'
import theme from './components/theme.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './redux/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}></PersistGate>
      </Provider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
