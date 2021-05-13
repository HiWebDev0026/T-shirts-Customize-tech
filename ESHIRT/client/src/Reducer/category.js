import {
    putHelper,
    deleteHelper
} from './helpers'

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

        case 'POST_CATEGORY':
            return {
                ...state,
                allCategories: [...state.allCategories, action.payload]
            }

        case 'PUT_CATEGORY':
            // let index=  state.allCategories.finiIndex(category=>category.id === action.payload.id);
            // state.allCategories[index] = action.payload;
            return{
                ...state,
                allCategories: putHelper(state.allCategories, action.payload) 
            }

        case 'DELETE_CATEGORY':
            return {
                ...state,
                allCategories: deleteHelper(state.allCategories, action.payload)
            }

        default: 
            return state;
    }
}

export default categoryReducer;