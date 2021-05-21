const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {Shirt, User, Detail, Category, Review} = require('../db.js');


async function postReview (req, res, next) {
    const shirtId = req.params.id;
    console.log(req.params)
    try {

        const shirt = await Shirt.findOne({where: {id: shirtId}})
        if (!shirt) throw {status: 404, message: 'Shirt not found'};

        const newReview = {content: req.body.content, shirtId}        
        const postedReview = await Review.create(newReview)
        return res.status(200).json(postedReview)
      
    } catch (err) {
        return next(err)
    }
}

async function getReviews (req, res, next) {
    const shirtId = req.params.id;
    try {
        const shirt = await Shirt.findOne({where: {id: shirtId}})
        if (!shirt) throw {status: 404, message: 'Shirt not found'}
        const shirts = await Review.findAll({where: {shirtId: shirtId}})
      /* console.log(shirts) */
        return res.status(200).json(shirts)
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    postReview,
    getReviews
}