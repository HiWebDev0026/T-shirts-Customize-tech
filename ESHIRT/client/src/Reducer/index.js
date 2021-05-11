import {combineReducers} from 'redux'

import userReducer from './user';
import shirtReducer from './shirt';
import categoryReducer from './category';
import cartReducer from './cart'

const rootReducer = combineReducers({
    userReducer,
    shirtReducer,
    categoryReducer,
    cartReducer
})

export default rootReducer
