import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import Header from './components/header/Header';
import Main from "./components/mainPage/Main";
import ListingPage from "./components/listingPage/ListingPage";

import store from './store'


function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route exact path={`/listing/:id`} component={ListingPage}/>
                        <Route exact path={"/"} component={Main}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
