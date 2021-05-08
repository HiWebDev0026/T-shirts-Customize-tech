const initialState={
    allUsers:[],
    usersByName: [],
    userId: {},
    
    allShirts: [],
    shirtsByName: [],
    shirtId: {},
    random6:[],

    allCategories: [],
    categoriesByName: [],
    
    confirmation: {}, // Para confirmacion del post, put & delete 
}

function rootReducer(state= initialState, action) {
    
    switch(action.type){
        
    ////////// USER /////////
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
                confirmation: action.payload
            }
            
        ///////////////////////
        
        //////// SHIRTS ///////

        case 'GET_SHIRTS':
            
            let random= action.payload.slice(0,6)           
            console.log(random)
            return {
                ...state,
                allShirts: action.payload,
                random6: random
            }
        case 'GET_SHIRTS_NAME':
            return {
                ...state,
                shirtsByName: action.payload
            }
        case 'GET_SHIRT':
            return {
                ...state,
                shirtId: action.payload
            }
        case 'POST_SHIRT':
            return

        case 'PUT_SHIRT':
            return

        case 'DELETE_SHIRT':
            return {
                ...state,
                confirmation: action.payload
            }
        ///////////////////////////

        //////// CATEGORIES ///////

        case 'GET_CATEGORIES':
            return {
                ...state,
                allCategories: action.payload
            }
        case 'GET_CATEGORIES_NAME':
            return {
                ...state,
                categoriesByName: action.payload
            }
        case 'POST_CATEGORY':
            return

        case 'PUT_CATEGORY':
            return

        case 'DELETE_CATEGORY':
            return {
                ...state,
                confirmation: action.payload
            }

        default: return state

    }


}
    

export default rootReducer;