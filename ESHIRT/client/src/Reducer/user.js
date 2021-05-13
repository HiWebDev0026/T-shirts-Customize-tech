const initialState = {
    allUsers:[],
    usersByName: [],
    userId: {}
}


const userReducer = (state = initialState, action) => {
    switch(action.type) {
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
                userId: action.payload
            }
        case 'POST_USER':
            return
        
        case 'PUT_USER':
            return
            
        case 'DELETE_USER':
            return {
                ...state,
                allUsers: state.allUsers.filter(user=> user.id !== action.payload)
            }
        default:
            return state
    }
}

export default userReducer;