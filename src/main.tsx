import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Router from './router/Router'
import { AuthProvider } from './contexts/AuthContext'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import "./App.css"
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={Router}/>
    </AuthProvider>
  </QueryClientProvider>
  </StrictMode>,
)
