import {
    putHelper,
    deleteHelper
} from './helpers'

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
            return {
                ...state,
                allUsers: putHelper(state.allUsers, action.payload)
            }
            
        case 'DELETE_USER':
            return {
                ...state,
                allUsers: deleteHelper(state.allUsers, action.payload)
            }
            
        default:
            return state
    }
}

export default userReducer;