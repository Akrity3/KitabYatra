import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import LoginPopup from './pages/LgoinPage'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <App/>
  </StrictMode>,
)
