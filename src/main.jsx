import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NavBar from './navigation.jsx'
import MainPage from './landing.jsx'
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar />
    <MainPage />
  </StrictMode>,
)
