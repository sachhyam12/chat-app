import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from './components/ui/provider'
import './index.css'
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ChatProvider from './Context/ChatProvider.jsx'
import { Toaster } from './components/ui/toaster'
createRoot(document.getElementById('root')).render(
  <Provider>
  <BrowserRouter>
  <ChatProvider>
    <Toaster />
    <App />
    
  </ChatProvider>
  </BrowserRouter>
  </Provider>
)
