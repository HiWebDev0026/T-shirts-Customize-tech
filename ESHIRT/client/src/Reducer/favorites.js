import {
    deleteHelper
} from './helpers'

const initialState = {
    favorites: []
}

const favoritesReducer = (state=initialState, action) => {
    console.log('entre al reducer')
    switch(action.type) {
        case 'GET_FAVORITES':          
            return {
                ...state,
                favorites: action.payload,
            }

        case 'POST_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            }

        case 'DELETE_FAVORITE':
            return {
                ...state,
                favorites: deleteHelper(state.favorites, action.payload)
            } 

        default:
            return state;
    }
}

export default favoritesReducer;