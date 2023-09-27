// --------------- IMPORTS ---------------
import React from 'react';
import ReactDOM from 'react-dom/client';

import axios from "axios";

import './index.css';
import App from './App.tsx';


// --------------- AXIOS BASE URL ---------------
// const baseURL: string = "http://localhost:3001";
const SERVER_URL: string = "https://forms-server-ar6n.onrender.com";
axios.defaults.baseURL = SERVER_URL;


// --------------- VDOM ---------------
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);