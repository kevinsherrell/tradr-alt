import React from 'react';
import {Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import Header from './components/header/Header';
import Main from "./components/mainPage/Main";
import ListingPage from "./components/listingPage/ListingPage";

import store from './store'


function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Header/>
                <Route exact path={"/"} component={Main}/>
                <Route exact path={`/listing/:id`} component={ListingPage}/>
            </div>
        </Provider>
    );
}

export default App;
