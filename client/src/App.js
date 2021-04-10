import React, {useContext, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/header/Header';
import Main from "./components/mainPage/Main";
import ListingPage from "./components/listingPage/ListingPage";

import {AuthContext} from './context/AuthContext'

function App() {
    const auth = useContext(AuthContext)
    useEffect(()=>{
        auth.retrieveSession()
    },[])
    return (

                <div className="App">
                    <Header/>
                    <Switch>
                        <Route exact path={`/listing/:id`} component={ListingPage}/>
                        <Route exact path={"/"} component={Main}/>
                    </Switch>
                </div>

    );
}

export default App;
