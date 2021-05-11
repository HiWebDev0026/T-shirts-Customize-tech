import axios from 'axios';

export function getUsers(){
    
    return async (dispatch) => {
        try {
            const res= await axios.get('http://localhost:3001/user', {responseType: 'json'})
            const users= res.data
            console.log(res)
            dispatch({type: 'GET_USERS', payload: users})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
        }
    }
}

export function getUsersByName(userName){
    
    return async (dispatch) => {
        try {
            const res= await axios.get(`http://localhost:3001/user?name=${userName}`, {responseType: 'json'})
            const users= res.data
            dispatch({type: 'GET_USERS_NAME', payload: users})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
        }
    }
}

export function getUserById(userId){
    
    return async (dispatch) => {
        try {
            const res= await axios.get(`http://localhost:3001/user/${userId}`, {responseType: 'json'})
            const user= res.data
            dispatch({type: 'GET_USER', payload: user})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
        }
    }
}

export function postUser(user){

    return async (dispatch) => {
        try {
            const res= await axios.post(`http://localhost:3001/user`, user, {responseType: 'json'})
            const newUser= res.data
            dispatch({type: 'POST_USER', payload: {...user, userId:newUser.id}})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
        }
    }
}

export function putUser(dataToModify, userId){

    return async (dispatch) => {
        try {
        const res= await axios.put(`http://localhost:3001/user/${userId}`, dataToModify, {responseType: 'json'})
        const modifiedUser= res.data
        dispatch({type: 'PUT_USER', payload: {...dataToModify, userId:modifiedUser.id}})
        } catch (err){
            console.log((err.response && err.response.data) || 'Server not working!');
        }
    }
}

export function deleteUser(userId){
    // Hacer un get antes de usar esta action porque se necesita el id
    return async (dispatch) => {
        try {
            const res= await axios.delete(`http://localhost:3001/user/${userId}`, {responseType: 'json'})
            dispatch({type: 'DELETE_USER', payload: res.status})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
        }        
    }
    
}