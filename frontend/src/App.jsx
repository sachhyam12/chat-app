import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, HStack } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/pageSection/HomePage.jsx'
import ChatPage from './components/pageSection/ChatPage.jsx'
import bgImage from "./assets/bgImage.png"
function App() {
  return (
  <div className='h-screen flex bg-cover bg-center'
  style={{ backgroundImage: `url(${bgImage})` }}
  >
    <Routes>
  <Route path='/' element={<HomePage />} exact/>
  <Route path='/chats' element={<ChatPage />} />
  </Routes>
  </div>
  )
}

export default App
