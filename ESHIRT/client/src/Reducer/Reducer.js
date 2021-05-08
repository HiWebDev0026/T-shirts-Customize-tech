const initialState={
    allUsers:[],
    usersByName: [],
    user: {},
    confirmation: {} // Para confirmacion del post, put & delete 
}

function rootReducer(state= initialState, action) {
    
    switch(action.type){
        case 'GET_USERS':
            return {
                ...state,
                allUsers: action.payload
            }
        case 'GET_USERS_NAME':
            return {
                ...state,
                usersByName: action.payload
            }
        case 'GET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'POST_USER':
            /* 
            {...user,
            userId: newId
            }
            */
            return
        case 'PUT_USER':
            return
        case 'DELETE_USER':
            return    


        default: return state

    }


}
    

export default rootReducer;