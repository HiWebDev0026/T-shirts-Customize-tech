import { v4 as uuidv4 } from 'uuid';

const initialState={
    items: [localStorage.getItem()]
}

const cartReducer = (state=initialState, action) => {
    switch (action.type){
        
        case 'PUSH_ITEM':
            let flag= false
            state.items.forEach(item => {
                if (item.id === action.payload.id){
                    if (item.size === action.payload.size){
                        flag= true
                    } 
                }
            })
            if (flag){
                

                return state
            } else {
                action.payload= {
                    ...action.payload,
                    index: uuidv4()
                }
                localStorage.setItem()
                return {
                    ...state,
                    items: [...state.items, action.payload]
                }
            }

        case 'DELETE_ITEM':
            let deleted= state.items.filter(i => i.index !== action.payload)
            return {
                ...state,
                items: deleted,
            }

        case 'ADD_ONE':
            let added= state.items.map(item => {
                if (item.index === action.payload){
                    item.amount += 1
                }
                return item
            })
            console.log(added)
            return {
                ...state,
                items: added
            }
            
        case 'OUT_ONE':
        let erased= []    
        if (state.items.length === 1){
            if (state.items[0].index === action.payload && state.items[0].amount === 1){
                return {...state, items:[]}
            } 
        }
        let droppedOne= state.items?.map(item => {
                if (item.index === action.payload){
                    if (item.amount === 1){
                        erased= state.items.filter(i => i.index !== action.payload)
                    }
                    item.amount -= 1
                }
                return item
            })
        if (erased.length < 1){
            return {
                ...state,
                items: droppedOne
            }
        } else {
            return {
                ...state,
                items: erased
            }
        }

        case 'CHANGE_SIZE':
            let modified= []
            if (state.items.length < 2){
                if (state.items[0].id === action.payload.id){
                    modified.push(action.payload)
                    console.log(modified)
                    return {
                        ...state,
                        items: modified
                    }
                } else {return state}
            }
            modified= state.items.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                items: modified.concat(action.payload)
            }

        case 'CLEAR':
            return {
                ...state,
                items: []
            }    

        default: return state
    }
}

export default cartReducer;