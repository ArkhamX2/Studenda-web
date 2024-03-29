import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store'
import Login from './pages/loginpage.js'
import Email from './pages/emailpage.js'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
