import axios from 'axios';

export function getCategories(){
    
    return async (dispatch) => {
        try {
            const res= await axios.get('/category', {responseType: 'json'})
            const categories = res.data
            
            dispatch({type: 'GET_CATEGORIES', payload: categories})
        } catch (err) {
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }
}

export function getCategoriesByName(categoryName){
    
    return async (dispatch) => {
        try {
            const res = await axios.get(`/category?name=${categoryName}`, {responseType: 'json'})
            const categories = res.data
            dispatch({type: 'GET_CATEGORIES_NAME', payload: categories})
        } catch (err) {
            
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }
}


export function postCategory(category){

    return async (dispatch) => {
        try {
            const res = await axios.post(`/category`, category, {responseType: 'json'})
            const newCategory = res.data
            dispatch({type: 'POST_CATEGORY', payload: {...category, id: newCategory.id, name: newCategory.name}})
        } catch (err) {
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }
}

export function putCategory(dataToModify, categoryId){

    return async (dispatch) => {
        try {
            const res = await axios.put(`/category/${categoryId}`, dataToModify, {responseType: 'json'})
            const modifiedCategory = res.data
            dispatch({type: 'PUT_CATEGORY', payload: {...dataToModify, id: modifiedCategory.id, name: modifiedCategory.name}})
        } catch (err){
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }
}

export function deleteCategory(categoryId){
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/category/${categoryId}`, {responseType: 'json'})
            dispatch({type: 'DELETE_CATEGORY', payload: categoryId})
        } catch (err) {
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }        
    }   
}

export function filterByCategory(categories){
    return {type: 'FILTER_BY_CATEGORY', payload: categories}        
}
