import axios from 'axios';

export function getFavorites(userId){
    
    return async (dispatch) => {
        try {
            const res= await axios.get(!userId ? `/favorites` : `/favorites/${userId}`, {responseType: 'json'});
            const favorites = res.data;
            dispatch({type: 'GET_FAVORITES', payload: favorites})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');

        }
    }
}

export function postFavorite(userId,shirtId){

    return async (dispatch) => {
        try {console.log(shirtId)
            const res = await axios.post(`/favorites/${userId}`, shirtId, {headers: {
                Authorization: `Bearer ${localStorage.currentToken}`
            }})
            const newFavorite = res.data
            //tengo que modificar le back
            dispatch({type: 'POST_FAVORITE', payload:newFavorite})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }
}

export function deleteFavorite(userId,shirtId){
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/favorites/${userId}`, {responseType: 'json', headers: {
                Authorization: `Bearer ${localStorage.currentToken}`
            }})
            dispatch({type: 'DELETE_FAVORITE', payload: shirtId})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }        
    }
    
}