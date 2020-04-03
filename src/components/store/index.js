import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import LocalStorageMiddleware from './LocalStorageMiddleware';


// Note: this API requires redux@>=3.1.0
const store = createStore(rootReducer, applyMiddleware(LocalStorageMiddleware));

export default store;