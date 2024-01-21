import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AboutPage from './quick-start/quick-start.tsx'
import HooksDataShare from './hooks-start/hooks.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <br></br>
    <div>
      <h1>Starting quick</h1>
    </div>
    <HooksDataShare/>
    <AboutPage />
  </React.StrictMode>,
)
