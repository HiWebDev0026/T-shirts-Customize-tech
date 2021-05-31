import {
    putHelper,
    deleteHelper
} from './helpers'

const initialState = {
    allShirts: [],
    shirtsByName: [],
    shirtId: {},
    random10:[],
    shirtPostOk: null,
    filteredByCategory: [],
    shirtsToFavorites:[]
}

const shirtReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'GET_SHIRTS':
            let random= action.payload.slice(0,10)
                     
            return {
                ...state,
                allShirts: action.payload,
                random10: random
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
                    if (check.length !== 0 && shirt.status !== 'deleted'){filter.push(shirt)}
                })
            }) */


            

            function catChecker(arr1, arr2, indexS=0, indexC=0, matches = 0) {
                
                return indexS ===arr1.length && matches === arr2.length ? true : arr2.length === 0 || arr2.length > arr1.length || indexS === arr1.length && matches < arr2.length  ? false : indexC === arr2.length && indexS < arr1.length? catChecker(arr1, arr2, indexS+1, indexC=0, matches) : arr1[indexS] === arr2[indexC] ? catChecker(arr1, arr2, indexS+1, indexC = 0, matches+1) : catChecker(arr1, arr2, indexS, indexC+1, matches)
            }
            
                filter = render.filter(shirt => {
                    let currentCategories = shirt.categories?.map(elem => elem.name);
                    
                    return catChecker(currentCategories, action.payload);
                    
                    /* currentCategories.toString().includes(action.payload.toString()) && currentCategories.length === action.payload.length; */
                    
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
        
            case 'GET_FAVORITES':
                let shirtsFavorite=[];
                if(action.payload.length>0&&state.allShirts.length>0){
                    for (let i=0; i<action.payload.length;i++){
                        for (let j=0; j<state.allShirts.length;j++){
                            if(action.payload[i] == state.allShirts[j].id){
                                shirtsFavorite.push(state.allShirts[j])
                            }
                        }
                    }
                    return {
                        ...state,
                        shirtsToFavorites: shirtsFavorite
                    }
                }else{
                    return state
                }
            case 'POST_FAVORITE':
                let filtered= state.shirtsToFavorites.filter(fav=>{return fav.id == action.payload.id})
                if(filtered.length<1){
                    return {
                        ...state,
                        shirtsToFavorites: [...state.shirtsToFavorites, action.payload],
                        }
                }else{
                    return state;
                }

            case 'DELETE_FAVORITE':
                return {
                    ...state,
                    shirtsToFavorites: deleteHelper(state.shirtsToFavorites,Number(action.payload))
                }

        default:
            return state;
    }
}

export default shirtReducer;
