import {combineReducers} from 'redux'

import userReducer from './user';
import shirtReducer from './shirt';
import categoryReducer from './category';
import cartReducer from './cart';
import ordersReducer from './orders';

import reviewsReducer from './review'

import paymentReducer from './payment'


const initialState = {
    errors: null
}

const globalReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'HANDLE_REQUEST_ERROR':
            return {
                ...state,
                errors: {
                    code: action.payload.status,
                    message: action.payload.message
                }
            }
    
        case 'RESET_ERRORS':
            return {
                ...state,
                errors: null
            }

        default:
            return state;
    }

}

const rootReducer = combineReducers({
    globalReducer,
    userReducer,
    shirtReducer,
    categoryReducer,
    cartReducer,
    ordersReducer,
    reviewsReducer,
    paymentReducer
})

export default rootReducer
