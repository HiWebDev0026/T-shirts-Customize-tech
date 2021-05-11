import {combineReducers} from 'redux'

import userReducer from './user';
import shirtReducer from './shirt';
import categoryReducer from './category';

const rootReducer = combineReducers({
    userReducer,
    shirtReducer,
    categoryReducer
})

export default rootReducer
