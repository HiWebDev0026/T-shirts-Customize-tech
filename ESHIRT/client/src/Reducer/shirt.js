import {
    putHelper,
    deleteHelper
} from './helpers'

const initialState = {
    allShirts: [],
    shirtsByName: [],
    shirtId: {},
    random6:[],
    shirtPostOk: null,
    filteredByCategory: []
}

const shirtReducer = (state=initialState, action) => {
    console.log('entre al reducer')
    switch(action.type) {
        case 'GET_SHIRTS':
            let random= action.payload.slice(0,6)
            console.log(state)           
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
            return {
                ...state,
                allShirts: [...state.allShirts, action.payload],
                shirtPostOk: true
            }

        case 'PUT_SHIRT':
            return {
                ...state, 
                allShirts: putHelper(state.allShirts, action.payload)
            }

        case 'DELETE_SHIRT':
            return {
                ...state,
                allShirts: deleteHelper(state.allShirts, action.payload)
            }

        case 'FILTER_BY_CATEGORY':
            let filter=[]   
            let render= []

            if(!action.payload){
                return {
                    ...state,
                    filteredByCategory:[]
                }
            }
            
            state.shirtsByName.length > 0 ? render= state.shirtsByName : render= state.allShirts
            /* action.payload.forEach(category => {
                let render= []
                state.shirtsByName.length>0 ? render= state.shirtsByName : render= state.allShirts
                render.forEach(shirt => {
                    let check= shirt.categories.filter(i => i.name === category)
                    if (check.length !== 0){filter.push(shirt)}
                })
            }) */
            console.log("cat62", action.payload);
            
                filter = render.filter(shirt => {
                    let currentCategories = shirt.categories?.map(elem => elem.name);
                    
                    return currentCategories.toString() === action.payload.toString();
                    
                })
            
            return {
                ...state,
                filteredByCategory: filter
            }
        
            case 'RESET_SHIRT_SEARCH':
                return {
                    ...state,
                    shirtsByName: [],
                }
            

        default:
            return state;
    }
}

export default shirtReducer;