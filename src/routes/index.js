import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Login } from '../screens/Login';
import { Type } from '../screens/Steps/type.js';
import { Car } from '../screens/Steps/car.js';
import { Payment } from '../screens/Steps/payment.js';
import { Ride } from '../screens/Ride';
import { Home } from '../screens/Home';
import { navigationRef } from './rootNavigation';
import { AuthContext, useAuth } from '../context/Auth';
import AuthApp from './auth';
import AppStack from './appStack';


const Stack = createStackNavigator();

const Routes = () => {
    const {authData} = useAuth();

    return (
        <NavigationContainer ref={navigationRef}>
            {/* {authData ? <AppStack/> : */}
             <AuthApp/>
            {/* //  } */}
        </NavigationContainer>
    )
}

export default Routes;