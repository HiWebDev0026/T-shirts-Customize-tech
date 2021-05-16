import axios from 'axios';

export function getShirts(){
    
    return async (dispatch) => {
        try {
            const res= await axios.get('/shirt', {responseType: 'json'});
            const shirts = res.data;
            console.log(res);
            dispatch({type: 'GET_SHIRTS', payload: shirts})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');

        }
    }
}

export function getShirtsByName(shirtName){
    console.log("Estoy en la action", shirtName);
    return async (dispatch) => {
        try {
            const res = await axios.get(`/shirt?name=${shirtName}`, {responseType: 'json'})
            const shirts = res.data
            dispatch({type: 'GET_SHIRTS_NAME', payload: shirts})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})
        }
    }
}

export function getShirtById(shirtId){
    
    return async (dispatch) => {
        try {
            const res = await axios.get(`/shirt/${shirtId}`, {responseType: 'json'})
            const shirt = res.data
            dispatch({type: 'GET_SHIRT', payload: shirt})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})
        }
    }
}

export function postShirt(shirt){

    return async (dispatch) => {
        try {console.log(shirt)
            const res = await axios.post(`/shirt`, shirt, {headers: {
                Authorization: `Bearer ${localStorage.currentToken}`
            }})
            const newShirt = res.data
            dispatch({type: 'POST_SHIRT', payload: {...shirt, shirtId: newShirt.id}})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }
}

export function putShirt(dataToModify, shirtId){

    return async (dispatch) => {
        try {
            const res= await axios.put(`/user/${shirtId}`, dataToModify, {responseType: 'json'}, {headers: {
                Authorization: `Bearer ${localStorage.currentToken}`
            }})
            const modifiedShirt = res.data
            dispatch({type: 'PUT_SHIRT', payload: {...dataToModify, shirtId: modifiedShirt.id}})
        } catch (err){
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }
}


export function deleteShirt(shirtId){
    // Hacer un get antes de usar esta action porque se necesita el id
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/shirt/${shirtId}`, {responseType: 'json', headers: {
                Authorization: `Bearer ${localStorage.currentToken}`
            }})
            dispatch({type: 'DELETE_SHIRT', payload: shirtId})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }        
    }
    
}
