import { all, takeLatest, select,call, put } from 'redux-saga/effects'
import types from './types'
import { Alert } from 'react-native'
import api from '../../../services/api'
import { navigate } from '../../../routes/rootNavigation'
import {updateUser, updateRide} from './actions'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function* checkUser() {
    try {

        const { user } = yield select((state) => state.app )
        const response = yield call(api.post, '/check-user', { userID: user.userID })
        
        const res = response.data;
       

        if(res.error) {
            console.log('error saga checkUser')
            alert(res.message)
            return false
        }
        if(res.user){
            yield put(updateUser(res.user))
            yield call(AsyncStorage.setItem, '@user', JSON.stringify(res.user))
            navigate('Home')

        } else {
            navigate('Type')
        }
    } catch (error) {
        alert(error.message)
    }
}

export function* createUser(){
    try {
        const { user, paymentMethod, car } = yield select(state => state.app)
        const response = yield call(api.post,'/signup', { user, paymentMethod, car } )
       
        const res = response.data;
       
       
        if(response.error) {
            alert(response.error)
            return false
        }

        yield put(updateUser(res.user));
        yield call(AsyncStorage.setItem, '@user', JSON.stringify(res.user))
        navigate('Home')

    } catch (error) {
        console.log(error.message)
    }
}

export function* getRideInfos({origin, destination}) {
    try {
        const response = yield call(api.post, '/pre-ride', {origin, destination})
        const res = response.data

        if(res.error){
            alert(res.message)
            return false
        }

        yield put(updateRide({info: res.info}))

        navigate('Home')


    } catch (error) {
        alert(error.message)
    }


}

export function* acceptRide(){
    try {
        const {user, ride} = yield select(state => state.app)

        const response = yield call(api.post, '/accept-ride', {
            ... ride,
            driverId: user._id
        })

        const res = response.data

        if(res.error) {
            alert(res.message)
            return false
        }

        yield put(updateRide(res.ride))
    } catch (error) {
        alert(error.message)
    }
}

export function* requestRide(){
    try {
        const {user, ride} = yield select(state => state.app)
       

        const response = yield call(api.post, '/call-ride', {
            info: ride.info,
            userId: user._id,
        })

        const res = response.data

       

        if(res.error) {
            alert(res.message)
            return false
        }

        yield put(updateRide(res.ride))
    } catch (error) {
        alert(error.message || error)
    }
}

export default all([
    takeLatest(types.CHECK_USER, checkUser),
    takeLatest(types.CREATE_USER, createUser),
    takeLatest(types.GET_RIDE_INFOS, getRideInfos),
    takeLatest(types.ACCEPT_RIDE, acceptRide),
    takeLatest(types.REQUEST_RIDE, requestRide),
])