const S = require('sequelize');
const Op = S.Op;
const {Category, Shirt} = require('../db.js');
// cambien los nombres de las functions
// renombrar los archivos controller.js cuando estén las rutas definidas

// COMENTARIO
    
async function postCategory(req, res, next) {
    
      
    try {
        
        const newCategory= {...req.body, name: req.body.name.toLowerCase()}
        const postedCategory = await Category.create(newCategory);
        return res.status(200).json(postedCategory)
    } catch (error) {
        next({status: 409, message: 'Category already exist'});
    }
}

async function getCategories(req, res, next) {  
    const name = req.query.name
    // NEEDS REFACTORING
    try { 
        if (!name) {
            const categories = await Category.findAll({include: [Shirt]})
            return res.status(200).json(categories)
        } else {
            const categories = await Category.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }, 
                include: [Shirt]
            })
            return res.status(200).json(categories)
        }

    } catch (error) {
        next({status: 404, message: 'Category not found'});
    }
}

async function deleteCategory(req, res, next) {     
    const categoryId = req.params.id
    try { 
        const category = await Category.findOne({where: {id: categoryId}, include: [Shirt]})
        if (category) {
            category.destroy()
            return res.status(200).json({message: "Category deleted"})
        } else {
            return next({status: 404, message: 'Category not found'})
        }
        
    } catch (error) {
        next({status: 400, message: 'Bad body request'});
    }
}

async function putCategory(req, res, next) {
    const categoryId = req.params.id     
    //body must send data to modify
    const body = {...req.body, name: req.body.name.toLowerCase()}          //cambio el alias
    const HEADERS = Object.keys(body)   //guardo en un array las keys del body (o sea la columnas de la tabla)
    try {                               //buscamos el id
        const category = await Category.findOne({where: {id: categoryId}, include: [Shirt]}) 
        if (body.name) {
            for (const header of HEADERS) {  //tomamos cada columna 
                category[header] = body[header] //usamos bracket notation porque cada header es un STRING!
            }
            category.save()
            return res.status(200).json(category)
        } else {
            return next({status: 404, message: 'Category not found'})
        }
        
    } catch (error) {
        next({status: 400, message: 'Bad body request'});
    }
}


module.exports = {
    postCategory,
    getCategories,
    deleteCategory,
    putCategory
}