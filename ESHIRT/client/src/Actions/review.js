import axios from 'axios';


export function getShirtReview(shirtId){
   
    return async (dispatch) => {
        try {
            const res = await axios.get(`/shirt/${shirtId}/review`, {responseType: 'json'})
            const shirt = res.data
            if (shirt.length === 0) {
                shirt.push({
                    id: 0,
                    content: 'No reviews yet',
                    image: null,
                    name: '',
                    scoreReview: 0,
                    shirtId
                })
            }

            dispatch({type: 'GET_SHIRT_REVIEW', payload: shirt})
           
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})
        }
    }
}
export function postShirtReview(dataReview, shirtId, userId){

    return async (dispatch) => {
        try {
           
            dataReview.userId = userId           
            const res= await axios.post(`/shirt/${shirtId}/review`, dataReview, {responseType: 'json'})
            dataReview.id = res.data.id 
            
            dispatch({type: 'POST_SHIRT_REVIEW', payload: dataReview})
        } catch (err){
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }
}
export function getShirtScore(shirtId){
   
    return async (dispatch) => {
        try {
            const res = await axios.get(`/shirt/${shirtId}/review`,  {responseType: 'json'})
            const score = res.data      
          
            dispatch({type: 'GET_SCORE_BY_ID', payload: score})
           
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})
        }
    }
}

export function getReviews () {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/review`,  {responseType: 'json'})
            const reviews = res.data
            dispatch({type: 'SET_SHIRTS_BY_SCORE', payload: reviews})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})
        }
    }
}

export function deleteReview (reviewId) {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/review/${reviewId}`,  {responseType: 'json'})
            dispatch({type: 'SET_SHIRTS_BY_SCORE', payload: parseInt(reviewId)})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})
        }
    }
}