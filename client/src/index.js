import React from 'react';
import ReactDOM from 'react-dom';
// import {BrowserRouter as Router} from 'react-router-dom'


import App from './App';

import './assets/css/base.css';
import {BrowserRouter as Router} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import {ListingProvider} from "./context/ListingContext";

ReactDOM.render(
    <AuthProvider>
        <ListingProvider>
            <Router>
                <App/>
            </Router>
        </ListingProvider>
    </AuthProvider>
    ,
    document.getElementById('root')
);

