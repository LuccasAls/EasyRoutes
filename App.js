import React from 'react';
import {

  View,
} from 'react-native';
import {Login} from './src/screens/Login';
import {Type} from './src/screens/Steps/type.js';
import {Car} from './src/screens/Steps/car.js';
import {Payment} from './src/screens/Steps/payment.js';
import {Ride} from './src/screens/Ride';
import { Home } from './src/screens/Home';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();
function App() {
 
  return (
    <Home/>
  )

}



export default App;
