import {
    putHelper,
    deleteHelper
} from './helpers'

const initialState = {
    allShirts: [],
    shirtsByName: [],
    shirtId: {},
    random6:[],
    shirtPostOk: null
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
                shirtsByName: action.payload.filter(i => i.status !== 'deleted')
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
        
            if(!action.payload){
                return {
                    ...state,
                    filteredByCategory:[]
                }
            }
            
            let filter=[]    
            action.payload.forEach(category => {
                let render= []
                state.shirtsByName.length>0 ? render= state.shirtsByName : render= state.allShirts
                render.forEach(shirt => {
                    
                    let check= shirt.categories.filter(i => i.name === category)
                    if (check.length !== 0 && shirt.status !== 'deleted'){filter.push(shirt)}
                })
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