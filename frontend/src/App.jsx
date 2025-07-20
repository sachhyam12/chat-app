import { useState } from 'react'
import './App.css'
import { Button, HStack } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/pageSection/HomePage.jsx'
import ChatPage from './components/pageSection/ChatPage.jsx'
import bgImage from "./assets/bgImage.jpg"
function App() {
  return (
  <div className='h-screen flex bg-cover bg-center'
  style={{ backgroundImage: `url(${bgImage})` }}
  >
    <Routes>
  <Route path='/' element={<HomePage />} exact/>
  <Route path='/chat' element={<ChatPage />} />
  </Routes>
  </div>
  )
}

export default App
