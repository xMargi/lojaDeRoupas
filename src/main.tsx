import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext' // importa o Provider
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider> {/* <<-- adiciona aqui */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
