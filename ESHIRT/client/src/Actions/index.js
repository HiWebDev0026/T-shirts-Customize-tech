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

export {
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
    filterByCategory        
}
