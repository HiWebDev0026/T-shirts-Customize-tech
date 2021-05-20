import {
    deleteHelper
} from './helpers'

const initialState = {
    reviews: []
}

const reviewsReducer = (state=initialState, action) => {
    console.log('entre al reducer de review')
    switch(action.type) {
        case 'GET_SHIRT_REVIEW':
         
            return {
                ...state,
                reviews: action.payload
            }

        case 'POST_SHIRT_REVIEW':
           
            return {
                ...state,
                reviews: [...state.reviews, action.payload],
            }

        case 'DELETE_':
            return {
                ...state,
                reviews: deleteHelper(state.reviews, action.payload)
            } 

        default:
            return state;
    }
}

export default reviewsReducer;