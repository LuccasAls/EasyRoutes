import React, { useEffect } from 'react';
import { Image } from 'react-native'
import {Container, Text } from '../../styles';
import Logo from '../../assets/logo.png'
import Facebook from '../../assets/facebook.png'
import Google from '../../assets/google.png'
import { useDispatch } from 'react-redux'

import { Button } from '../../components/Button';
import { handleLoginFacebook } from '../../services/social';
import { useAuth } from '../../context/Auth';
import store from '../../store';

import { all, takeLatest, select,call } from 'redux-saga/effects'
import { updateUser, checkUser, clearRide } from '../../store/modules/app/actions';
// import {checkUser} from '../../store/modules/app/sagas'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import rootReducer from '../../store/modules/rootReducer';

export  function Login({navigation}) {
    const dispatch = useDispatch()
    const {singIn } = useAuth();

    const checkLogin = async () => {
        // AsyncStorage.clear()

        const user = await AsyncStorage.getItem('@user')
        
        if(user) {
            dispatch(updateUser(JSON.parse(user)))
            navigation.replace('Home')
        }
    }
    const {user} = useSelector((rootReducer) => rootReducer.app)

   useEffect(() => {

    checkLogin()


   }, [])


    

    return (
        <Container
            background="background"
            padding={40}
        >
            <Container row height={100} >
                <Image source={Logo} style={{marginRight: 20}}/>
                <Text fontSize={30} color="primary">Easy</Text>
                <Text fontSize={30} color="title">Routes</Text>
            </Container>

            <Container height={200} gap={20} >
                <Button
                    icon={Facebook}
                    text='Fazer login com Facebook'
                    color="facebook"
                    // onPress={() => singIn()}
                    onPress={handleLoginFacebook}
                />
                <Button
                    icon={Google}
                    text='Fazer login com Google'
                    color="google"
                    textColor="background"
                />
            </Container>

        </Container>
    )
}

