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
    deleteShirt,
    resetShirtSearch
   
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
    clear,
    setCartItems,
    setSizeChanged
} from './cart.js'

import {
    getOrders,
    postOrder,
    putOrder,
    modifyOrderStatus,
    resetPutOrderOk,
    getOrderById,
    getOrdersByUserId,
    checkLastOrder,
    setPostStarted
} from './orders.js'

import {
    getFavorites,
    postFavorite,
    deleteFavorite
} from './favorites.js'

import {
    createPayment
} from './payment'

import{
    getShirtReview,
    postShirtReview,
    getShirtScore,
    getReviews
} from './review.js'

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
    resetShirtSearch,
    

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
    setCartItems,
    setSizeChanged,

    getOrders,
    postOrder,
    putOrder,
    modifyOrderStatus,
    resetPutOrderOk,
    getOrderById,
    getOrdersByUserId,
    checkLastOrder,
    setPostStarted,

    getFavorites,
    postFavorite,
    deleteFavorite,

    createPayment,

    getShirtReview,
    postShirtReview,
    getShirtScore,
    getReviews
}
