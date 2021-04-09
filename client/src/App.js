import React, {useContext} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import Header from './components/header/Header';
import Main from "./components/mainPage/Main";
import ListingPage from "./components/listingPage/ListingPage";

import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './store'
import {AuthProvider, AuthContext} from './context/AuthContext'

function App() {
    const value = useContext(AuthContext)
    console.log(value)
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route exact path={`/listing/:id`} component={ListingPage}/>
                        <Route exact path={"/"} component={Main}/>
                    </Switch>
                </div>
            </Router>
        </AuthProvider>

    );
}

export default App;
