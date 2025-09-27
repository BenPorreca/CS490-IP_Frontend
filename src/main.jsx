import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TopMovies from './topMovies.jsx'
import TopActors from './topActors.jsx'
import FilmCatalog from './filmCatalog.jsx'
import Customers from './customers.jsx'
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <Customers />
      <TopMovies />
      <TopActors />
      
      <FilmCatalog />
    </div>
  </StrictMode>,
)
