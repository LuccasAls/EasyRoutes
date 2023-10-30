import React, { useState, useEffect } from 'react';

import { Container, Scroll } from '../../styles';
import { Titles } from '../../components/Titles';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import Plate from '../../assets/license-plate.png'
import CarIcon from '../../assets/car.png'
import Paint from '../../assets/paint.png'
import Shop from '../../assets/shop.png'
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateCar, createUser} from '../../store/modules/app/actions'

export function Car({navigation}) {
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(true);
    const [car, setCar] = useState({
        placa: null,
        marca: null,
        modelo: null,
        cor: null,
    });

    const  singIn = () => {
        navigation.navigate('Home')
        dispatch(updateCar(car))
        dispatch(createUser())
    }



    useEffect(()=> {


        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setIsVisible(false)
        });
        const keyboardDidHiddenListener = Keyboard.addListener("keyboardDidHide", () => {
            setIsVisible(true)
        });
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHiddenListener.remove();
        }
    }, [])

    return (
         <Container
                background="background"
                justify="flex-start"
                padding={30}
            >
                <Container
                    justify="flex-start"
                   
                >
                    <Titles
                        title="Cadastre seu Veículo"
                        description="Preencha os campos abaixo"
                    />

                    <Container
                        justify="flex-start"
                        paddingBottom={20}
                        gap={15}
                    >
                    

                        <Input
                            title="Placa do Veículo"
                            icon={Plate}
                            placeholder="Digite o número da placa do veiculo"
                            onChangeText={(placa) =>  {
                                setCar({...car, placa})
                            }}
                            value={car.placa}
                        />
                        <Input
                            title="Marca"
                            icon={Shop}
                            placeholder="Digite a marca do veículo"
                            onChangeText={(marca) =>  {
                                setCar({...car, marca})
                            }}
                            value={car.marca}
                        />
                        <Input
                            title="Modelo"
                            icon={CarIcon}
                            placeholder="Digite o modelo do veículo"
                            onChangeText={(modelo) =>  {
                                setCar({...car, modelo})
                            }}
                            value={car.modelo}
                        />
                        <Input
                            title="Cor"
                            icon={Paint}
                            placeholder="Digite a cor do veículo"
                            onChangeText={(cor) =>  {
                                setCar({...car, cor})
                            }}
                            value={car.cor}
                        />

                    </Container>
                </Container>



                {isVisible && 
                    <Button
                        text="Continuar"
                        color="secondary"
                        onPress={() => singIn()}
                    />
                }
            </Container>
    );
}