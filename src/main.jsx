import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import TopMovies from './topMovies.jsx'
import TopActors from './topActors.jsx'
import FilmCatalog from './filmCatalog.jsx'
import Customers from './customers.jsx'
import NavBar from './navbar.jsx'
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={
          <>
            <TopMovies />
            <TopActors />
          </>}/>
        <Route path="/films" element={<FilmCatalog />}/>
        <Route path="/customers" element={<Customers />}/>
      </Routes>
    </Router>
  </StrictMode>,
)
