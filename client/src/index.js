import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from "react-router-dom";
import routes from "./routes/Routes";
import NavBar from './components/NavBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <NavBar/>
        <RouterProvider router={routes}/>
    </React.StrictMode>
);
