

export function getItems(){
    
    return (dispatch) => {
        dispatch({type: 'GET_ITEMS'})
    }
}

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