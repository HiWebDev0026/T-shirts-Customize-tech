import {
    deleteHelper
} from './helpers'

const initialState = {
    reviews: [],
    score: 0
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
                reviews: [...state, ],
            }
        case 'GET_SCORE_BY_ID':
            
            let stateCopy = [action.payload];  
           
          
            
            let datasetSum = stateCopy[0].reduce((a,b) => a + parseInt(b.scoreReview),0);
          
            let p = Math.round(datasetSum/stateCopy[0].length);
           
            return{
                ...state,
                score: p
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