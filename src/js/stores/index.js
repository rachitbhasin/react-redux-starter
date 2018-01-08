import {compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import indexReducer from '../reducers';

let store = createStore(indexReducer,
    compose(
        applyMiddleware(thunkMiddleware),
        window.devToolsExtension && process.env.NODE_ENV === 'development' ? window.devToolsExtension() : f => f
    )
);

export default store;