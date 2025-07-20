import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from './components/ui/provider'
import './index.css'
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ChatProvider from './Context/ChatProvider.jsx'


createRoot(document.getElementById('root')).render(
  <Provider>
      <BrowserRouter>
      <ChatProvider>
    <App />
  </ChatProvider>
      </BrowserRouter>
    </Provider>
)
