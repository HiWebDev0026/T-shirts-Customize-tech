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
            const res = await axios.get(`http://localhost:3001/shirt?name=${shirtName}`, {responseType: 'json'})
            const shirts = res.data
            dispatch({type: 'GET_SHIRTS_NAME', payload: shirts})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
        }
    }
}

export function getShirtById(shirtId){
    
    return async (dispatch) => {
        try {
            const res = await axios.get(`http://localhost:3001/shirt/${shirtId}`, {responseType: 'json'})
            const shirt = res.data
            dispatch({type: 'GET_SHIRT', payload: shirt})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
        }
    }
}

export function postShirt(shirt){

    return async (dispatch) => {
        try {console.log(shirt)
            const res = await axios.post(`http://localhost:3001/shirt`, shirt, {responseType: 'json'})
            const newShirt = res.data
            dispatch({type: 'POST_SHIRT', payload: {...shirt, shirtId: newShirt.id}})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
        }
    }
}

export function putShirt(dataToModify, shirtId){

    return async (dispatch) => {
        try {
            const res= await axios.put(`http://localhost:3001/user/${shirtId}`, dataToModify, {responseType: 'json'})
            const modifiedShirt = res.data
            dispatch({type: 'PUT_SHIRT', payload: {...dataToModify, shirtId: modifiedShirt.id}})
        } catch (err){
            console.log((err.response && err.response.data) || 'Server not working!');
        }
    }
}


export function deleteShirt(shirtId){
    // Hacer un get antes de usar esta action porque se necesita el id
    return async (dispatch) => {
        try {
            const res = await axios.delete(`http://localhost:3001/shirt/${shirtId}`, {responseType: 'json'})
            dispatch({type: 'DELETE_SHIRT', payload: res.status})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
        }        
    }
    
}
