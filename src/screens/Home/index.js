import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  Map,
  Avatar,
  Text,
  Button,
  Line,
  Divider,
  ButtonEdit,
  Circle,
  PulseCircle,
  BackButton
} from '../../styles';
import Search from '../../assets/search.png';
import { Input } from '../../components/Input';
import { useSelector, useDispatch } from 'react-redux';
import { Marker, Polyline } from 'react-native-maps'
import socket from '../../services/socket';
import { Image, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import DriverIcon from '../../assets/carIcon.png';
import { updateRide, acceptRide, requestRide, clearRide } from '../../store/modules/app/actions';


export function Home({ navigation }) {
  const mapRef = useRef(null)
  const [passenger, setPassenger] = useState()
  const dispatch = useDispatch()
  const { user, ride } = useSelector((rootReducer) => rootReducer.app)
  const [driverLocation, setDriverLocation] = useState({
    latitude: -23.681477041246964,
    longitude: -46.77314051501838
  })
  const type = user.type
  const ws = useRef(null)
  
  const handleRide = () => {
    navigation.navigate('Ride')
  }
  const rideStatus = () => {
    if (ride?.user?._id) {
      if (ride?.driver?._id) {
        return 'inRide';
      } else {
        return 'inSearch'
      }
    }
    return 'empty'
  }
  const updateSocketId = async (socketId) => {
    try {
      await api.put(`/socket/${user._id}`, { socketId })

      // console.log('socket updated')
    }catch (err) {
      console.log('update socket id error =>', err.message)
    }
  }
  const rideAccept = () => {
    if(rideStatus() != 'inRide' ){

      dispatch(acceptRide())
    } else {
      console.log('cancelar corrida')
      handelCancelRide()
    }
  }
  const updateLocation = async (coordinates) => {
    try {
      await api.put(`/location/${user._id}`, {
        coordinates,
        socketId: ride?.user?.socketId,
        status: rideStatus()
      })
      
    } catch (error) {
        console.log('update location error =>' + error.message)
    }
  }
  const updateMapLocation = async (coordinates) => {
    if(user.type === 'P'){
      setDriverLocation({
        latitude: coordinates[0],
        longitude: coordinates[1]

      });

      mapRef.current.animateCamera({
        center: {
          latitude: coordinates[0],
          longitude: coordinates[1]
        },
        // zoom: 9
      })
    }
  }
  const initSocket = () => {
    ws.current = socket()
    
    ws.current.on('connect', () => {
      const id = ws.current.id
      updateSocketId(id)

    ws.current.on('ride-request', (ride) => {
      console.log('---- SOLICITAÇÃO CORRIDA -----')
      dispatch(updateRide(ride))
      setPassenger(ride.user)
    })

    ws.current.on('ride', (ride) => {
      dispatch(updateRide(ride))
    })

    ws.current.on('ride-update', (coordinate) => {
      updateMapLocation(coordinate)
    })
    ws.current.on('clear-ride', () => {
      console.log('socket clear ride')
      dispatch(clearRide())

    })
      
    })

  }
  const handelCancelRide = async () => {
    try {
      // console.log(ride)

      await api.put(`/status/${ride?._id}`, {
        user: ride.user,
        driverId: ride.driverId,
        driverSocketId: ride.driver.socketId,
        type: user.type
      })
      // console.log(res)
      dispatch(clearRide())
      

    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {

    initSocket()
  }, [])

  useEffect(() => {
    mapRef.current.fitToCoordinates(ride?.info?.route, {
      options: {
        edgePadding: {
          top: 100,
          right: 70,
          bottom: 150,
          left: 70,
        }
      }
    })
  }, [ride])

  return (
    <Container>
      <Map
       
        ref={mapRef}
        initialRegion={{
          latitude: -23.681477041246964,
          longitude: -46.77314051501838,
          latitudeDelta: 0.0155,
          longitudeDelta: 0.0121,
        }}
        disable={rideStatus() === "inSearch" && user.type === "P"}
        onRegionChangeComplete={(region) => {
          if (user.type === "M"){
            setDriverLocation(region)
            updateLocation([region.latitude, region.longitude])
          }
        }}

      >
        {(ride?._id || user.type === "M")  &&
            <Marker coordinate={driverLocation}>
              <TouchableOpacity style={{
                height: 25,
                width: 25,
                backgroundColor: '#000',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Image style={{height: 17, width: 17}} source={DriverIcon}/>
              </TouchableOpacity>
            </Marker>
        }
        {ride?.info?.route &&
          <>
            <Polyline
              coordinates={ride?.info?.route}
              strokeWidth={4}
            />
            <Marker coordinate={ride?.info?.route[0]}></Marker>
            <Marker coordinate={ride?.info?.route[ride?.info?.route.length - 1]}></Marker>
          </>
        }

      </Map>
      <Container
        position="absolute"
        justify="space-between"
        align="flex-start"
        padding={10}
        zIndex={999}
        pointerEvents='box-none'

        style={{ height: '98%' }}
      >
        {/*HEADER*/}
        <Container
          height={130}
          justify="flex-start"
          align="flex-start"
        >
          {/*AVATAR*/}

          {(rideStatus() != 'inSearch' && !ride?.info) &&

            <BackButton>
              <Avatar source={{ uri: user?.imageURL }} />
            </BackButton>

          }

          {/*USUÁRIO SEM CORRIDA*/}

          {rideStatus() != 'inRide' && type === "P" && ride?.info &&
            <Container
              height={130}
              background="background"
              border={20}
              elevation={50}
            >
              <Container
                align="flex-start"
                padding={20}
                paddingBottom={20}
              >
                <Container row justify="flex-start" gap={20}>
                  <Circle />
                  <Text fontSize={14} numberOfLines={1}> {ride?.info?.start_address}</Text>
                </Container>
                <Container row justify="flex-start" gap={20}>

                  <Circle red />
                  <Text fontSize={14} numberOfLines={1}> {ride?.info?.end_address}</Text>
                </Container>

              </Container>
              <ButtonEdit onPress={() => navigation.navigate('Ride')}>
                <Text fontSize={14}>Toque para editar</Text>
              </ButtonEdit>

            </Container>
          }

        </Container>

        {rideStatus() === 'inSearch' && type === "P" &&
          <Container
            padding={20}
            paddingBottom={20}
            zIndex={-1}
          >
            <PulseCircle
              numPulses={3}
              diameter={400}
              speed={20}
              duration={2000}
            />
          </Container>
        }

        <Container
          elevation={50}
          height={190}
          background="background"
          border={20}

        >

          {/*PASSAGEIRO SEM CORRIDA*/}
          {type === "P" && rideStatus() === 'empty' && !ride?.info &&
            <TouchableOpacity onPress={() => handleRide()} style={{ width: '100%', height: '100%' }} >
              <Container
                justify="flex-start"
                align="flex-start"
                padding={23}
                paddingBottom={23}
              >
                <Container
                  height={70}
                  justify="flex-start"
                  align="flex-start"
                >
                  <Text fontSize={14}> Olá, {user?.name}! </Text>
                  <Text fontSize={20} > Para onde você quer ir?</Text>
                </Container>
                <Input
                  editable={false}
                  icon={Search}
                  placeholder="Procure seu destino"
                />
              </Container>
            </TouchableOpacity>

          }

          {/*MOTORISTA SEM CORRIDA*/}

          {type === "M" && rideStatus() == 'empty' &&
            <Container
              padding={23}
              paddingBottom={23}
            >
              <Container height={70}>
                <Text fontSize={14} > Olá, {user?.name}! </Text>
                <Text fontSize={20} >Nenhuma solicitação!</Text>
              </Container>
            </Container>
          }

          {/*PASSAGEIRO INFORMAÇÕES DA CORRIDA*/}

          {type === "P" && rideStatus() === 'empty' &&
            <Container

              justify="flex-start"
              align="flex-start"
            >

              <Container row height={70}>
                <Text fontSize={14} color="primary">Easy</Text>
                <Text fontSize={14} >Convencional</Text>
              </Container>

              <Container
                row
                paddingBottom={20}
              >
                <Text fontSize={25} >R$ {ride?.info?.price.replace('.', ',')}</Text>
                <Line />
                <Text fontSize={25} >{ride?.info?.duration?.text}</Text>
              </Container>
              <Button type='secondary' onPress={() => dispatch(requestRide())}>
                <Text fontSize={14} >Chamar <Text fontSize={14} color="primary">Easy</Text> <Text fontSize={14} >Convencional</Text></Text>
              </Button>
            </Container>
          }
          {/*PASSAGEIRO BUSCANDO  CORRIDA*/}

          {(type === "P" && rideStatus() === 'inSearch') &&
            <Container

              justify="flex-start"
              align="flex-start"
            >

              <Container row height={70}>
                <Text fontSize={14} color="primary">Easy</Text>
                <Text fontSize={14} >Convencional</Text>
              </Container>

              <Container
                row
                paddingBottom={20}
              >
                <Text fontSize={25} >R$ {ride?.info?.price}</Text>
                <Line />
                <Text fontSize={25} >{ride?.info?.duration?.text}</Text>
              </Container>
              <Button type={'info'}>
                <Text fontSize={14}  >Cancelar <Text fontSize={14} color="primary">Easy</Text> <Text fontSize={14} >Convencional</Text></Text>
              </Button>
            </Container>
          }
          {/*PASSAGEIRO EM  CORRIDA*/}

          {type === "P" && rideStatus() === 'inRide' &&
            <Container

              justify="flex-start"
              align="flex-start"
            >

              <Container row padding={30} paddingBottom={30}>
                <Container row gap={15}>
                  <Avatar source={{ uri: ride?.driver?.imageURL }} />
                  <Container align="flex-start">
                    <Text fontSize={16}>{ride?.driver?.name.split(" ")[0]} {ride?.info?.distance?.text}</Text>
                    <Text fontSize={12} color="muted">{ride?.car?.modelo} - {ride?.car?.placa } - {ride?.car?.cor}</Text>
                  </Container>

                </Container>

                <Divider />
                <Container width={90} >
                  <Text fontSize={18}>R$ {ride?.info?.price}</Text>
                  <Text fontSize={10} color="primary">Aprox. {ride?.info?.duration.text}</Text>
                </Container>

              </Container>
              <Button type="info">
                <Text fontSize={14} onPress={() => handelCancelRide()} >Cancelar <Text fontSize={14} color="primary">Easy</Text> <Text fontSize={14} >Convencional</Text></Text>
              </Button>
            </Container>
          }

          {/*MOTORISTA ACEITAR  CORRIDA*/}

          {type === "M" && ride?.info &&
            <Container

              justify="flex-start"
              align="flex-start"
            >

              <Container row padding={25} paddingBottom={20}>
                <Container row gap={15}>
                  <Avatar source={{ uri: ride?.user?.imageURL }} />
                  <Container align="flex-start">
                    <Text fontSize={16}>{ride?.user?.name.split(" ")[0]}  {ride?.info?.distance?.text}</Text>
                    
                    <Text full fontSize={14} color="muted" numberOfLines={1}>{ride?.info.start_address}</Text>
                    <Text full fontSize={14} color="muted" numberOfLines={1}>{ride?.info.end_address}</Text>
                  </Container>

                </Container>

                <Divider />
                <Container width={75} >
                  <Text fontSize={18}>R$ {ride?.info?.price}</Text>
                  <Text fontSize={10} color="primary">Aprox. {ride?.info.duration?.text}</Text>
                </Container>

              </Container>
              <Button onPress={() => rideAccept()} type={rideStatus() != 'inRide' ? 'secondary': 'info'} >
                <Text fontSize={14} >
                  {rideStatus() != 'inRide' 
                  ? "Aceitar Corrida"
                  : "Finalizar Corrida"
                  } 
                  
                </Text>
              </Button>
            </Container>
          }



        </Container>
      </Container>
    </Container>
  );
}