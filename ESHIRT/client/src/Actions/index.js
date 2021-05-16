import {
    getUsers,
    getUsersByName,
    getUserById,
    postUser,
    putUser,
    deleteUser   
} from './user.js'

import {
    getShirts,
    getShirtsByName,
    getShirtById,
    postShirt,
    putShirt,
    deleteShirt
} from './shirt.js';

import {
    getCategories,
    getCategoriesByName,
    postCategory,
    putCategory,
    deleteCategory,
    filterByCategory
} from './category.js';

import {
    addOne,
    outOne,
    pushItem,
    deleteItem,
    changeSize,
    clear
} from './cart.js'

import {
    getOrders,
    postOrder,
    putOrder,
    modifyOrderStatus,
    resetPutOrderOk,
    getOrderById,
    getOrdersByUserId
} from './orders.js'

const resetErrors = () => {
    return {type: 'RESET_ERRORS'}
}

export {
    resetErrors,

    getUsers,
    getUsersByName,
    getUserById,
    postUser,
    putUser,
    deleteUser,

    getShirts,
    getShirtsByName,
    getShirtById,
    postShirt,
    putShirt,
    deleteShirt,

    getCategories,
    getCategoriesByName,
    postCategory,
    putCategory,
    deleteCategory,
    filterByCategory,  
    
    addOne,
    outOne,
    pushItem,
    deleteItem,
    changeSize,
    clear,

    getOrders,
    postOrder,
    putOrder,
    modifyOrderStatus,
    resetPutOrderOk,
    getOrderById,
    getOrdersByUserId
}
