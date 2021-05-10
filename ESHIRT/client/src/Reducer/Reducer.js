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
    filteredByCategory: [],
    
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
            console.log("estoy en el reducer", action.payload);
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
        case 'FILTER_BY_CATEGORY':
            
            if(!action.payload){
                return {
                    ...state,
                    filteredByCategory:[]
                }
            }
        
            let filter=[]    
            action.payload.map(category => {
                let render= []
                state.shirtsByName.length>0 ? render= state.shirtsByName : render= state.allShirts
                render.map(shirt => {
                    let check= shirt.categories.filter(i => i.name === category)
                    if (check.length !== 0){filter.push(shirt)}
                })
            })
            return {
                ...state,
                filteredByCategory: filter
            }
            
        case 'POST_CATEGORY':
            return {
                ...state,
                allCategories: [...state.allCategories, action.payload]
            }

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