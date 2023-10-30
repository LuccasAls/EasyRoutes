import React, { useState, useEffect } from 'react';
import { Image, Keyboard } from 'react-native';
import { Container, Text, BackButton, AddressList, AddressItem, Separator } from '../../styles';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import Arrow from '../../assets/left-arrow.png'
import Location from '../../assets/location.png'
import api from '../../services/api';
import { getRideInfos,  } from '../../store/modules/app/actions';
import { useDispatch } from 'react-redux';

export function Ride({navigation}) {
    const [isVisible, setIsVisible] = useState(true);
    const [list, setList] = useState([]);
    const [activeInput, setActiveInput] = useState(null);
    const [origin, setOrigin] = useState({});
    const [destination, setDestination] = useState({});
    const dispatch = useDispatch()

    const getRide = () => {
        dispatch(getRideInfos(origin.place_id, destination.place_id));
    }
    const getPlaces = async (address) => {
        try {
            const response = await api.get(`address/${address}`);
            const res = response.data;

            if (res.error){
                alert(res.message);
                return false
            }

            setList(res.list)

        } catch (error) {
            Alert(error.message)
        }
    }

    const setAddressInput = (item) => {
        if(activeInput == 'setOrigin'){
            setOrigin(item)
        }else {
            setDestination(item)
        }
    }

    useEffect(() => {
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
            justify="space-between"
            padding={30}
        >

            <Container
                height={70}
                row
                justify="space-between"
            >
                <BackButton onPress={() => navigation.goBack()}>
                    <Image source={Arrow} style={{ height: 18, width: 18 }} />
                </BackButton>
                <Text fontSize={20} >Corrida</Text>
                <Container width={10} />
            </Container>
            <Container
                justify="flex-start"
                

            >
                <Container 
                    justify="flex-start" 
                    height={190}
                    gap={20}
                >
                    <Input
                        icon={Location}
                        title="Embarque"
                        placeholder="Digite seu local de destino"
                        onChangeText={(address) => getPlaces(address)}
                        onFocus={() => setActiveInput('setOrigin')}
                        value={origin.description} 
                    />
                    <Input
                        icon={Location}
                        title="Destino"
                        placeholder="Digite seu local de embarque"
                        onFocus={() => setActiveInput('setDestination')}
                        onChangeText={(address) => getPlaces(address)}
                        value={destination.description}
                    />
                </Container>
                <Container
                    justify="flex-start"
                >
                    <AddressList
                        ItemSeparatorComponent={Separator}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.place_id}
                        data={list}
                        renderItem={({item, index}) => (
                            <AddressItem onPress={() => setAddressInput(item)}>
                                <Text fontSize={18}>{item.description}</Text>
                                <Text fontSize={14} color="muted">{item.secondary_text}</Text>
                            </AddressItem>
                        )}

                    />

                </Container>

            </Container>
                {isVisible &&
                    <Button
                        onPress={() => getRide()}
                        text="Atualizar Mapa"
                        color="secondary"
                    />
                }

        </Container>
    );
}