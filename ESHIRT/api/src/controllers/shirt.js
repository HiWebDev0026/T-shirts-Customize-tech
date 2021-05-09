const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {Shirt, User, Detail, Category} = require('../db.js');

const setToLower = (body) => {
    for (const field in body) {
        if (field !== 'print' && field !== 'size' && field !== 'public') {
            body[field] = body[field].toLowerCase()
        }
    }
    return body
}


async function postShirt(req, res, next) {        
    // this will have a validation before post
    try {
        const body = setToLower(req.body)
        const newShirt = {...req.body, created_by_user: true} 
        const postedShirt = await Shirt.create(newShirt);
        if (req.body.categoryId) {
            await postedShirt.addCategory(req.body.categoryId);
        }

        return res.status(200).json(postedShirt)
    } catch (error) {
        console.log(error);
        next({status: 409, message: 'Shirt already exist'});
    }
}

async function getShirt(req, res, next) {     
    const shirtId = req.params.id
    try { 
        const shirt = await Shirt.findOne({where: {id: shirtId}, include: [Category]})
        if (shirt) {
            console.log(shirt)
            console.log(typeof shirt.print)
            console.log(shirt.print)
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
    //body must send data to modify
    const body = setToLower(req.body)
    const HEADERS = Object.keys(body)   //guardo en un array las keys del body (o sea la columnas de la tabla)
    try {                               //buscamos el id
        const shirt = await Shirt.findOne({where: {id: shirtId}, include: [Category]}) 
        if (shirt) {
            for (const header of HEADERS) {  //tomamos cada columna 
                if (header === 'categories') { 
                    await shirt.setCategories(body[header]); //array de ids 
                } else {
                    shirt[header] = body[header] //usamos bracket notation porque cada header es un STRING!
                }
            }
            shirt.save()
            return res.status(200).json(shirt)
        } else {
            return next({status: 404, message: 'Shirt not found'})
        }
        
    } catch (error) {
        next({status: 400, message: 'Bad body request'});
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