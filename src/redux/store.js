import {createStore, compose, applyMiddleware} from 'redux';
// import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = { key: 'SistemaVentas', storage };

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = [thunk];

const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(...middleware)));
const persistor = persistStore(store);

export {store, persistor};