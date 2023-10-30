// import { applyMiddleware, compose, configureStore, createStore } from '@reduxjs/toolkit'
import { applyMiddleware, compose, createStore } from 'redux'
import  createSagaMiddleware  from 'redux-saga'
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import Reactotron from '../config/reactotron';


const sagaMiddleware = createSagaMiddleware();


const store = createStore(
    rootReducer, 
    compose(applyMiddleware(sagaMiddleware), Reactotron.createEnhancer())
);



sagaMiddleware.run(rootSaga);


export default store;