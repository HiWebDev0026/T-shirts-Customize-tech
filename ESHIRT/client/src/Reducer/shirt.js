const initialState = {
    allShirts: [],
    shirtsByName: [],
    shirtId: {},
    random6:[]
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
            return

        case 'PUT_SHIRT':
            return

        case 'DELETE_SHIRT':
            return {
                ...state,
                confirmation: action.payload
            }

        default:
            return state;
    }
}

export default shirtReducer;