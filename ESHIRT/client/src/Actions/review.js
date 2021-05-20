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
export function postShirtReview(dataToModify, shirtId, userId){

    return async (dispatch) => {
        try {
            dataToModify['userId']  = userId
            const res= await axios.post(`/shirt/${shirtId}/review`, dataToModify, {responseType: 'json'})
            const shirtReview = res.data
            console.log(dataToModify)
            dispatch({type: 'POST_SHIRT_REVIEW', payload: {...dataToModify, id: shirtReview.id}})
        } catch (err){
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }
}
