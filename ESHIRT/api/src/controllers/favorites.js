const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {Shirt, User, favorites} = require('../db.js');

async function getFavorites (req, res, next) {
    const userId = req.params.userId.toString();
    try {
        const shirts = await favorites.findAll({where: {userId: userId}})
        if (!shirts) {throw {status: 404, message: 'User not found'}}
        else{    
            return res.json(shirts.map(shirt=>shirt.shirtId))
        }
    } catch (err) {
        return next(err)
    }
};

async function postFavorites (req, res, next) {
    const userId = req.params.userId.toString();
    const {shirtId} = req.body;

    try {
        const user = await User.findOne({where: {id: userId}});
        const shirt = await Shirt.findOne({where: {id: shirtId}});
        if(!user || !shirt) throw {status: 400, message: 'User or shirtId no provided'}
        if (user&&shirt){
            await user.addShirt(shirt.id);
            return res.json(shirt) ;
        }else{
            throw {status: 400, message: 'User or shirtId no provided'}
        }
    } catch (error) {
        return next(error);
    }
};

async function deleteFavorites (req, res, next) {
    const userId = req.params.userId.toString();
    const {shirtId} = req.body;
    try { 
        const toRemove = await favorites.findOne({where:{[Op.and]:[{userId: userId}, {shirtId:shirtId}]}});
        console.log('REMOVE',toRemove)
        if (toRemove) {
            toRemove.destroy()
            return res.json(shirtId);
        } else {
            return next({status: 404, message: 'Shirt not found'})
        }
        
    } catch (error) {
        next({status: 400, message: 'Bad body request'});
    }

};

module.exports = {
    getFavorites,
    postFavorites,
    deleteFavorites
}
