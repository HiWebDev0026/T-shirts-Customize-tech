const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {User, Shirt, Order} = require('../db.js');


const setToLowerCase = (body) => {
    return {
        ...body,
        name: body.name.toLowerCase(), 
        lastname: body.lastname.toLowerCase(),
        country: body.country.toLowerCase(), 
        city: body.city.toLowerCase(), 
        adress: body.adress.toLowerCase()        
    }
}

const validatePost = (body) => {
    const {name, email} = body
    return (name && /\S+@\S+.\S+/.test(email) )
}

const validatePut = (body) => {
    if (Object.keys(body).length === 0) { return false; } // body is an empty object

    const modelFileds = ["name", "lastname", "email", "country", "city", "adress", "phone"]

    for (const field of modelFileds) {
        if (body.hasOwnProperty(field) && !body[field]) { return false; } // body.name = "" returns false
        if (body[field] && field === "email" && !/\S+@\S+.\S+/.test(body[field])) { return false; } // bad email format 
        if (body[field] && field === "phone" && isNaN(phone)) {return false;} // phone is not a number
    }

    return true;
}



async function postUser(req, res, next) {        
    try {
        if (!validatePost(req.body)){ return next({status: 400, message: 'Bad body request'})};
        
        //const newUser = setToLowerCase(req.body)
        const postedUser = await User.create({...req.body, id: req.body.id.toString()});
        return res.status(200).json(postedUser)
    } catch (error) {
        console.log(error)
        next({status: 409, message: 'User already exists'});
    }
}


async function getUser(req, res, next) {     
    const userId = req.params.id
    try { 
        const user = await User.findOne({where: {id: userId}, include: [Shirt, Order]})
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
    const name = req.query.name

    try { 
        if (!name) {
            const users = await User.findAll({include: [Shirt]})
            return res.status(200).json(users)
        } else {
            const users = await User.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }, 
                include: [Shirt]
            })
            return res.status(200).json(users)
        }

    } catch (error) {
        console.log(error)
        next({status: 404, message: 'Users not found'});
    }
}

async function putUser(req, res, next) {
    const userId = req.params.id
    const body = req.body     
    try {
        const user = await User.findOne({where: {id: userId}, include: [Shirt]})
        if (!user) { return next({status: 404, message: 'User not found'}) } 
        //if (!validatePut(body)) { return next({status: 400, message: 'Bad body request'})}
        
        for (const field in body) {
            if (field !== "phone" && field !== "email") {
                user[field] = body[field].toLowerCase()    
            } else {
                user[field] = body[field]
            }   
        }
        user.save()
            return res.status(200).json(user)
        
    } catch (error) {
        next({status: 400, message: 'Bad body request'});
    }
}

async function deleteUser(req, res, next) {     
    const userId = req.params.id.toString()
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


module.exports = {
    postUser,
    getUser,
    getUsers,
    putUser,
    deleteUser
}