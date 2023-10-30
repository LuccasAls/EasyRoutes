import types from "./types";
import  {produce}  from "immer";
// import  produce  from "immer";

const INITIAL_STATE = {
    user: {
        userID: null,
        name: null,
        email: null,
        type: 'M',
        accessToken: null,
    },
    car: {
        placa: null,
        marca: null,
        modelo: null,
        cor: null,
    },
    paymentMethod: {
        nome: null,
        numero: null,
        validade: null,
        cvv: null,
    },
    ride: null,
   
}

function app(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.UPDATE_USER: {
            return produce(state, (draft) => {
             draft.user = {...state.user, ...action.user}     
             })        
        }
        case types.UPDATE_CAR: {
            return produce(state, (draft) => {
             draft.car = {...state.car, ...action.car}     
             })        
        }
        case types.UPDATE_RIDE: {
            return produce(state, (draft) => {
             draft.ride = {...state.ride, ...action.ride}     
             })        
        }
        case types.UPDATE_PAYMENT: {
            return produce(state, (draft) => {
             draft.paymentMethod = {...state.paymentMethod, ...action.payment}     
             })        
        }
        case types.CLEAR_RIDE: {
            return produce(state, (draft) => {
                draft.ride = INITIAL_STATE.ride
            })
        }
        default:
            return state;
    }

    
}

export default app;