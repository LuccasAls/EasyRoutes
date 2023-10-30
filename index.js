/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Login} from './src/screens/Login';
import {Type} from './src/screens/Steps/type.js';
import {Car} from './src/screens/Steps/car.js';
import {Payment} from './src/screens/Steps/payment.js';
import {Ride} from './src/screens/Ride';
import { Home } from './src/screens/Home';
import  Routes  from './src/routes';


import { Provider } from 'react-redux'
import store from './src/store';

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import { AuthProvider } from './src/context/Auth';

const App = () => (
    <Provider store={store}>
        <AuthProvider>
            <Routes/>
        </AuthProvider>
    </Provider>
)

AppRegistry.registerComponent(appName, () => App);
