import React from 'react'
import ReactDOM from 'react-dom/client'
import Categories from './categories/categories.jsx'
import App from './App.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar/>
    <App />
  </React.StrictMode>
)
