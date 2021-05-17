const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {Shirt, User, Detail, Category, Review} = require('../db.js');

const setToLower = (body) => {
    for (const field in body) {
        if (field !== 'print' && field !== 'size' && field !== 'public') {
            body[field] = body[field].toLowerCase()
        }
    }
    return body
}

const validatePost = (body) => {
    const {name, color, model, size, print, public, score, categories} = body;
    
    if (!(name && color && model && print && (typeof public !== 'undefined'))) { console.log("important fields"); return false; }
    if (isNaN(print) && print.length < 50) {console.log("print"); return false;}
    if (score && isNaN(score)) { console.log("score"); return false; }
    if (categories && !Array.isArray(categories)) {console.log("categories"); return false; }

    return true;
}

const validatePut = (body) => {
    if (Object.keys(body).length === 0) { return false; } // body is an empty object

    const modelFileds = ["name", "color", "model", "size", "print", "score"]

    for (const field of modelFileds) {
        if (body.hasOwnProperty(field)) {
            if (!body[field]) { return false; } // body.name = "" returns false
            if (field === "print" && body[field].length < 50) {return false;}
            if (field === "score" && isNaN(body[field])) {return false;}
            if (field === "categories" && !Array.isArray(body[field])) {return false;} 
        }
    }

    return true;

}


async function postShirt(req, res, next) {        
    try {
        
        if (!validatePost(req.body)) {return next({status: 400, message: 'Bad body request'})}

        const newShirt = {...req.body, name: req.body.name.toLowerCase(), created_by_user: true, userId: req.body.userId.toString()} 
        const postedShirt = await Shirt.create(newShirt);
        
        if (newShirt.categories) {
            try {
                for (const categoryId of newShirt.categories) {
                    const id = Number(categoryId);
                    if (!isNaN(id) && id > 0) {
                        await postedShirt.addCategory(id);
                    } else {
                        throw {status: 400, message: 'Bad Category Id Format'}
                    }        
                }
            } catch (err) {
                return next(err)
            }
            
        }

        return res.status(200).json(postedShirt)
    } catch (error) {
        console.log(error);
        next({status: 409, message: 'Shirt already exists'});
    }
}

async function getShirt(req, res, next) {     
    const shirtId = req.params.id
    try { 
        const shirt = await Shirt.findOne({where: {id: shirtId}, include: [Category]})
        if (shirt) {
            return res.status(200).json(shirt)
        } else {
            return next({status: 404, message: 'Shirt not found'})
        }
        
    } catch (error) {
        next({status: 400, message: 'Bad body request'});
    }
}

async function deleteShirt(req, res, next) {     
    const shirtId = req.params.id
    try { 
        const shirt = await Shirt.findOne({where: {id: shirtId}, include: [Category]})
        if (shirt) {
            shirt.destroy()
            return res.status(200).json({message: "shirt deleted"})
        } else {
            return next({status: 404, message: 'Shirt not found'})
        }
        
    } catch (error) {
        next({status: 400, message: 'Bad body request'});
    }
}


async function putShirt(req, res, next) {
    const shirtId = req.params.id
    const body = req.body        
    try {                               
        const shirt = await Shirt.findOne({where: {id: shirtId}, include: [Category]}) 
        if (!shirt) { throw {status: 404, message: 'Shirt not found'} }
        if (!validatePut(body)) { throw {status: 400, message: 'Bad body request'}}

        for (const field in body) {
            if (field === "categories") {
                const categories = body[field].map(id => {
                    if (!isNaN(id) && Number(id) > 0) {
                        return id
                    } else {
                        throw {status: 400, message: 'Bad Category Id Format'}
                    }
                })
                await shirt.setCategories(categories);
            } else if (field === "name") {
                shirt[field] = body[field].toLowerCase()
            } else {
                shirt[field] = body[field]
            }
        }
        shirt.save()
        shirt.categories = body.categories //after save(), this will send categories in body
        return res.status(200).json(shirt)
        
    } catch (error) {
        next(error);
    }
}



async function getShirts(req, res, next) {  
    let name = req.query.name
    // NEEDS REFACTORING
    try { 
        if (!name) {
            
            const shirts = await Shirt.findAll({include: [Category]})
            return res.status(200).json(shirts)

        } else {
            name = name.toLowerCase()
            const shirts = await Shirt.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }, 
                include: [Category]
            })
            return res.status(200).json(shirts)
        }

    } catch (error) {
        next({status: 404, message: 'Shirt not found'});
    }
}

module.exports = {
    postShirt,
    getShirts,
    getShirt,
    putShirt,
    deleteShirt
}