const initialState = {
    allCategories: [],
    categoriesByName: [],
    filteredByCategory: []
}

const categoryReducer = (state=initialState, action) => {
    switch(action.type) {
        
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
            action.payload.forEach(category => {
                let render= []
                state.shirtsByName.length>0 ? render= state.shirtsByName : render= state.allShirts
                render.forEach(shirt => {
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
            let index=  state.allCategories.finiIndex(category=>category.id === action.payload.id);
            state.allCategories[index] = action.payload;
            
            return{
                ...state,
                allCategories: state.allCategories
            }

        case 'DELETE_CATEGORY':
            return {
                ...state,
                confirmation: action.payload
            }

        default: 
            return state;
    }
}

export default categoryReducer;