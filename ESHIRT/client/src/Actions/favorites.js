import axios from 'axios';
const bodyParser = require('body-parser');

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
        try {
            console.log(shirtId)
            const res = await axios.post(`/favorites/${userId}`, shirtId);
            const newFavorite = res.data
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
            const res = await axios.delete(`/favorites/${userId}`, {data:shirtId});
            const idShirt = res.data
            dispatch({type: 'DELETE_FAVORITE', payload: idShirt})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }        
    }
    
}