

export function pushItem(item){
    return (dispatch) => {
        dispatch({type: 'PUSH_ITEM', payload: item})
    }
}

export function deleteItem(id){
    return (dispatch) => {
        dispatch({type: 'DELETE_ITEM', payload: id})
    }
}

export function addOne(id){
    
    return (dispatch) => {
        dispatch({type: 'ADD_ONE', payload: id})
    }
}

export function outOne(id){
    return (dispatch) => {
        dispatch({type: 'OUT_ONE', payload: id})
    }
}

export function changeSize(item){
    return (dispatch) => {
        dispatch({type: 'CHANGE_SIZE', payload: item})
    }
}

export function clear(){
    return (dispatch) => {
        dispatch({type: 'CLEAR'})
    }
}