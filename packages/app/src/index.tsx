import App from './App'
import './globals.css'
import { initSentry, ToastContainer } from '@recap/shared'
import { ErrorBoundary } from '@sentry/react'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

initSentry('web')

const container = document.getElementById('app') as Element
const root = ReactDOM.createRoot(container)

root.render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
)
