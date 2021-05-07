const {User, Shirt} = require('../db.js');

function validation(data){
    let {name, email, password, country, city, adress, phone}= data
    if (!name || !email || !password || !country || !city || !adress || !phone || typeof phone !== 'integer'){
        return false
    }
}

async function postUser(req, res, next) {        
    // this will have a validation before post
    if (!validation(req.body)){
        next({status: 400, message: 'Bad body request'})
    }
    try {
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


/* async */ function epicController(req, res, next) {

    
    
    
    /* try {
        
    } catch (error) {
        
    } */

    return;
}

module.exports = {
    postUser,
    getUser
}