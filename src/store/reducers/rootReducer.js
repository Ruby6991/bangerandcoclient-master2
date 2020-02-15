import authReducer from './authReducer'
import vehicleReducer from './vehicleReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth:authReducer,
    vehicle:vehicleReducer
});

export default rootReducer