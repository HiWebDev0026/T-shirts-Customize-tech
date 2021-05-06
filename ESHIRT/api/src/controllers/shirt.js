const {Shirt, User, Detail, Category} = require('../db.js');


// User.belongsToMany(Shirt, {through: 'favorites'}) FAVORITES
// Shirt.belongsToMany(User, {through: 'favorites'})
// User.hasMany(Order)
// Order.belongsTo(User)

// User.hasMany(Shirt) BUENO ESTO VA A HABER Q GOOGLEARLO POR EJEMPLO, COMO HACER EL ADD() AHI LO VEMOS
// Shirt.belongsTo(User) //necesitamos saber como asociar el id de user, o sea supongo q con add ya esta, pero ahora lo probamos

// Order.hasMany(Detail)
// Detail.belongsTo(Order)

// Shirt.hasOne(Detail) me hace dudar esto, una remera tiene un detalle? #qpaja jajajaja
// Detail.belongsTo(Shirt) otra vez, q paja ajjaja

// Category.belongsToMany(Shirt, {through: 'shirt_category'})
// Shirt.belongsToMany(Category, {through: 'shirt_category'})
// dale, banca q hay q hacer lo import/export
async function postShirt(req, res, next) {        
    // this will have a validation before post
    try {
        const newShirt = req.body
        const postedShirt = await Shirt.create(newShirt);
        return res.status(200).json(postedShirt)
    } catch (error) {
        next({status: 409, message: 'User already exist'});
    }
}

//vayamos probando


/* async */ function controllerX(req, res, next) {        


    /* 
    try {
        
    } catch (error) {
        
     */
    
    return;
}
    

/* async */ function controllerZ(req, res, next) {
    
        
        
        
    /* try {
            
    } catch (error) {
            
    } */
    
    return;
}

module.exports = {
    postShirt
}