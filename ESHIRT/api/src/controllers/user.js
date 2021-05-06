const {User} = require('../db.js');

// cambien los nombres de las functions
// renombrar los archivos controller.js cuando estén las rutas definidas


// User.belongsToMany(Shirt, {through: 'favorites'})
// Shirt.belongsToMany(User, {through: 'favorites'})
// User.hasMany(Order)
// Order.belongsTo(User)

// User.hasMany(Shirt)
// Shirt.belongsTo(User)

// Order.hasMany(Detail)
// Detail.belongsTo(Order)

// Shirt.hasOne(Detail)
// Detail.belongsTo(Shirt)

// Category.belongsToMany(Shirt, {through: 'shirt_category'})
// Shirt.belongsToMany(Category, {through: 'shirt_category'})

async function postUser(req, res, next) {        
    // this will have a validation before post
    try {
        const newUser = req.body
        const postedUser = await User.create(newUser);
        return res.status(200).json(postedUser)
    } catch (error) {
        next({status: 409, message: 'Username already exist'});
    }
}

/* async */ function epicController(req, res, next) {

    
    
    
    /* try {
        
    } catch (error) {
        
    } */

    return;
}

module.exports = {
    postUser
}