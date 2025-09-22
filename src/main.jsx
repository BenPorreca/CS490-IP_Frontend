import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TopMovies from './topMovies.jsx'
import TopActors from './topActors.jsx'
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='wrapper'>
      <TopMovies />
      <TopActors />
    </div>
  </StrictMode>,
)
