const {User, Shirt} = require('../db.js');

function validation(data){
    let {name, email, password, country, city, adress, phone}= data
    if (name && email && password && country && city && adress && phone && typeof phone === 'number'){
        return true
    } else {return false}
}

async function postUser(req, res, next) {        
    // this will have a validation before post
    let {name, email, password, country, city, adress, phone}= req.body
    try {
        if (!(name && /\S+@\S+.\S+/.test(email) && password && country && city && adress && !isNaN(phone) )){
           return next({status: 400, message: 'Bad body request'})
        }
        const newUser = req.body
        const postedUser = await User.create(newUser);
        return res.status(200).json(postedUser)
    } catch (error) {
        next({status: 409, message: 'User already exist'});
    }
}


async function getUser(req, res, next) {     
    const userId = req.params.id
    try { 
        const user = await User.findOne({where: {id: userId}, include: [Shirt]})
        if (user) {
            return res.status(200).json(user)
        } else {
            return next({status: 404, message: 'User not found'})
        }
        
    } catch (error) {
        next({status: 400, message: 'Bad body request'});
    }
}

async function getUsers(req, res, next) {  
    
    // NEEDS REFACTORING

    try { const users = await User.findAll({include: [Shirt]})
    return res.status(200).json(users)

    } catch (error) {
        next({status: 404, message: 'Users not found'});
    }
}

async function putUser(req, res, next) {
    const userId = req.params.id     
    //body must send data to modify
    const body = req.body               //cambio el alias
    const HEADERS = Object.keys(body)   //guardo en un array las keys del body (o sea la columnas de la tabla)
    try {                               //buscamos el id
        const user = await User.findOne({where: {id: userId}, include: [Shirt]}) 
        if (user) {
            for (const header of HEADERS) {  //tomamos cada columna 
                user[header] = body[header] //usamos bracket notation porque cada header es un STRING!
            }
            user.save()
            return res.status(200).json(user)
        } else {
            return next({status: 404, message: 'User not found'})
        }
        
    } catch (error) {
        next({status: 400, message: 'Bad body request'});
    }
}

async function deleteUser(req, res, next) {     
    const userId = req.params.id
    try { 
        const user = await User.findOne({where: {id: userId}, include: [Shirt]})
        if (user) {
            user.destroy()
            return res.status(200).json({message: "User deleted"})
        } else {
            return next({status: 404, message: 'User not found'})
        }
        
    } catch (error) {
        next({status: 400, message: 'Bad body request'});
    }
}


/* async */ function epicController(req, res, next) {

    
    
    
    /* try {
        
    } catch (error) {
        
    } */

    return;
}

module.exports = {
    postUser,
    getUser,
    getUsers,
    putUser,
    deleteUser
}