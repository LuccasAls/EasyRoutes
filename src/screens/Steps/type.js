import React, { useEffect } from 'react';
import { Image } from 'react-native'

import { Container, Text } from '../../styles';
import { Button } from '../../components/Button';
import { Titles } from '../../components/Titles';
import fastForward from '../../assets/fastForward.png'
import { CardOptions } from '../../components/CardOptions';

import Payment from '../../assets/payment.png'
import Drive from '../../assets/drive.png'

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/modules/app/actions'

export function Type({navigation}) {
    const dispatch = useDispatch()
    const {user} = useSelector((rootReducer) => rootReducer.app)

    const toggleType = (type) => {
        dispatch(updateUser({type}))
       

    }

    const nextPage = () => {
        const route = user.type == 'M' ? 'Car' : 'Payment'
        navigation.navigate(route)
    }

    

  return (
    <Container
        background="background"
        justify="space-between"
        padding={30}
        paddingBottom={30}
        
    >
        <Titles
            title="Passageiro ou Motorista?"
            description={`Selecione aqui qual será sua posição aqui`}
        />
        
        <Container 
            gap={30}
        >
            <CardOptions
                icon={Drive}
                title="Motorista"
                color= {user.type == 'M' ? "facebook" : "google"}
                fontColor={user.type == 'M' ?  "google" : "background"}
                onPress={() => toggleType('M')}
            />
            <CardOptions
                icon={Payment}
                title="Passageiro"
                color={user.type == 'P' ? "facebook" : "google"}
                fontColor={user.type == 'P' ?  "google" : "background"}
                onPress={() => toggleType('P')}
            />

        </Container>

        <Button 
            color="secondary"
            text="Proximo passo"
            icon={fastForward}
            direction="row-reverse"
            onPress={() => nextPage()}
        />
    </Container>
  );
}