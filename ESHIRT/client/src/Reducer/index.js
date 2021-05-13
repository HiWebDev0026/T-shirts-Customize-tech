import {combineReducers} from 'redux'

import userReducer from './user';
import shirtReducer from './shirt';
import categoryReducer from './category';
import cartReducer from './cart'

const initialState = {
    errors: {
        '400': false,
        '404': false,
        '409': false,
        '500': false
    }
}

const globalReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'HANDLE_REQUEST_ERROR':
            return {
                ...state,
                errors: {[action.payload]: true}
            }
    
        case 'RESET_ERRORS':
            return {
                ...state,
                errors: {
                    '400': false,
                    '404': false,
                    '409': false,
                    '500': false
                }
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
    cartReducer
})

export default rootReducer
