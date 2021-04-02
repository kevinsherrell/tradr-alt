import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'

import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// original
// export let store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

// new
export let store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
export let persistor = persistStore(store);

// export default () => {
//     let store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
//     let persistor = persistStore(store);
//     return {store, persistor}
// }//     let persistor = persistStore(store);