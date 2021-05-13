import axios from 'axios';

export function getUsers(){
    
    return async (dispatch) => {
        try {
            const res= await axios.get('/user', {responseType: 'json'})
            const users= res.data
            console.log(res)
            dispatch({type: 'GET_USERS', payload: users})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }
}

export function getUsersByName(userName){
    
    return async (dispatch) => {
        try {
            const res= await axios.get(`/user?name=${userName}`, {responseType: 'json'})
            const users= res.data
            dispatch({type: 'GET_USERS_NAME', payload: users})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }
}

export function getUserById(userId){
    
    return async (dispatch) => {
        try {
            const res= await axios.get(`/user/${userId}`, {responseType: 'json'})
            const user= res.data
            dispatch({type: 'GET_USER', payload: user})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }
}

export function postUser(user){

    return async (dispatch) => {
        try {
            const res= await axios.post(`/user`, user, {responseType: 'json'})
            const newUser= res.data
            dispatch({type: 'POST_USER', payload: {...user, userId:newUser.id}})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }
}

export function putUser(dataToModify, userId){

    return async (dispatch) => {
        try {
        const res= await axios.put(`/user/${userId}`, dataToModify, {responseType: 'json'})
        const modifiedUser= res.data
        dispatch({type: 'PUT_USER', payload: {...dataToModify, userId:modifiedUser.id}})
        } catch (err){
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }
}

export function deleteUser(userId){
    // Hacer un get antes de usar esta action porque se necesita el id
    return async (dispatch) => {
        try {
            console.log(typeof userId, "soy id de delete")
            const res= await axios.delete(`/user/${userId}`, {responseType: 'json'})
            console.log(res.status, "soy el status")
            dispatch({type: 'DELETE_USER', payload: userId})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }        
    }
    
}