import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter } from 'react-router-dom';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import MainContext from './context/Context.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <BrowserRouter>
        <MainContext>
          <App />
        </MainContext>
      </BrowserRouter>
    </PrimeReactProvider>
  </React.StrictMode>,
)
