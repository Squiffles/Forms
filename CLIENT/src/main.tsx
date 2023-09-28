// --------------- IMPORTS ---------------
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import axios from "axios";
import store from './redux/store.js';

import './index.css';
import App from './App.tsx';


// --------------- AXIOS BASE URL ---------------
// const baseURL: string = "http://localhost:3001";
const SERVER_URL: string = "https://forms-server-ar6n.onrender.com";
axios.defaults.baseURL = SERVER_URL;


// --------------- VDOM ---------------
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);