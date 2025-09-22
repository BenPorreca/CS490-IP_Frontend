import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Feature1 from './feature1.jsx'
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='wrapper'>
      <Feature1 />
    </div>
  </StrictMode>,
)
