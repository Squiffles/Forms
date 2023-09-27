// --------------- IMPORTS ---------------
import React from 'react';
import ReactDOM from 'react-dom/client';

import axios from "axios";

import './index.css';
import App from './App.tsx';


// --------------- AXIOS BASE URL ---------------
const baseURL: string = "http://localhost:3001";
axios.defaults.baseURL = baseURL;


// --------------- VDOM ---------------
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);