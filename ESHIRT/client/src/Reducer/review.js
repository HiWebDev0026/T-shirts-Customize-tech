import {
    deleteHelper
} from './helpers'

const initialState = {
    reviews: [],
    score: 0,
    sortedScores: null,
}

const reviewsReducer = (state=initialState, action) => {
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
        case 'SET_SHIRTS_BY_SCORE':

            const reviews = action.payload;
            const shirts = {}
            for (const review of reviews) {
                const shirtName = 'shirtId_' + review.shirtId.toString()
                if (!shirts.hasOwnProperty(shirtName)) {
                    shirts[shirtName] = {scoreReview: parseInt(review.scoreReview), counter: 1}
                } else {
                    shirts[shirtName].scoreReview += parseInt(review.scoreReview);
                    shirts[shirtName].counter++;                    
                }
            }

            const scoreList = []

            for (const shirt in shirts) {
                const shirtAveraged = {shirtId: 0, score: 0}
                shirtAveraged.shirtId = parseInt(shirt.split('_')[1])
                shirtAveraged.score = Math.ceil(shirts[shirt].scoreReview / shirts[shirt].counter)
                scoreList.push(shirtAveraged)
            }

            scoreList.sort((a, b) => {return b.score - a.score})

            return {
                ...state,
                sortedScores: scoreList
            }
            
        case 'DELETE_REVIEW':
            return {
                ...state,
                reviews: deleteHelper(state.reviews, action.payload)
            } 

        default:
            return state;
    }
}

export default reviewsReducer;