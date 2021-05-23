import axios from 'axios';


export function getShirtReview(shirtId){
   
    return async (dispatch) => {
        try {
            const res = await axios.get(`/shirt/${shirtId}/review`, {responseType: 'json'})
            const shirt = res.data      
           
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
            const shirtReview = res.data
            
            dispatch({type: 'POST_SHIRT_REVIEW', payload: shirtReview})
        } catch (err){
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }
}
export function getShirtScore( shirtId){
   
    return async (dispatch) => {
        try {
            const res = await axios.get(`/shirt/${shirtId}/review`,  {responseType: 'json'})
            const score = res.data      
           
            dispatch({type: 'GET_SHIRT_BY_SCORE', payload: score})
           
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})
        }
    }
}