const { where } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {Shirt, User, Detail, Category, Review} = require('../db.js');


async function postReview (req, res, next) {
    const shirtId = req.params.id;
    const userId = req.body.userId
    const scoreReview = req.body.scoreReview
   
    try {

        const shirt = await Shirt.findOne({where: {id: shirtId}})
        if (!shirt) throw {status: 404, message: 'Shirt not found'};

        const newReview = {content: req.body.content, shirtId, userId, name: req.body.name, image: req.body.image, scoreReview}        
        const postedReview = await Review.create(newReview)
        return res.status(200).json(postedReview)
      
    } catch (err) {
        return next(err)
    }
}

async function getReviews (req, res, next) {
    const shirtId = req.params.id;
    try {
        const shirt = await Shirt.findOne({where: {id: shirtId}, include: [User]})
        if (!shirt) throw {status: 404, message: 'Shirt not found'}
        const shirts = await Review.findAll({where: {shirtId: shirtId}})
      /* console.log(shirts) */
        return res.status(200).json(shirts)
    } catch (err) {
        return next(err)
    }
}

async function getAllReviews (req, res, next) {
    try {
        const reviews = await Review.findAll();
        return res.status(200).json(reviews)
    } catch (err) {
        return next({status: 500, message: 'Review model problem'})
    }
}

async function deleteReview (req, res, next) {
    const reviewId = parseInt(req.params.id)
    try {
        const review = await Review.findOne({where: {id: reviewId}});
        if (!review) throw {status: 404, message: 'Shirt not found'}
        await review.destroy()
        return res.status(200).json({})
    } catch (err) {
        return next({status: 500, message: 'Review model problem'})
    }
}


module.exports = {
    postReview,
    getReviews,
    getAllReviews,
    deleteReview
}