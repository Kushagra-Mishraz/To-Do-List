import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './toDo.css'
import App from './toDo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
