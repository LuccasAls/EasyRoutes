import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Login } from '../screens/Login';
import { Type } from '../screens/Steps/type.js';
import { Car } from '../screens/Steps/car.js';
import { Payment } from '../screens/Steps/payment.js';
import { Ride } from '../screens/Ride';
import { Home } from '../screens/Home';
import { navigationRef } from './rootNavigation';


const Stack = createStackNavigator();

const AuthApp = () => {
    return (
       
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Type' component={Type} />
            <Stack.Screen name='Car' component={Car} />
            <Stack.Screen name='Payment' component={Payment} />
            <Stack.Screen name='Ride' component={Ride} />
        </Stack.Navigator>
       
    )
}

export default AuthApp