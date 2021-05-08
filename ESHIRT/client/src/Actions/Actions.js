const axios= require('axios')

export function postUser(){}

export function getUsers(){

    return async (dispatch) => {
        const res= await axios.get('http://localhost:3001/user', {responseType: 'json'})
        const users= res.data
        console.log(res)
        dispatch({type: 'GET_USERS', payload: users})
    }
}

export function getUser(userId){

    return async (dispatch) => {
        const res= await axios.get(`http://localhost:3001/user/${userId}`, {responseType: 'json'})
        const user= res.data
        dispatch({type: 'GET_USER', payload: user})
    }
}

export function putUser(){}

export function deleteUser(){
// Hacer un get antes de usar esta action porque se necesita el id

}