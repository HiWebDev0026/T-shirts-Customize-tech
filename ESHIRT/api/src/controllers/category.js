const S = require('sequelize');
const Op = S.Op;
const {Category, Shirt} = require('../db.js');
// cambien los nombres de las functions
// renombrar los archivos controller.js cuando estén las rutas definidas

// COMENTARIO


const filterInvalidCharts = (txt) => {
    let result = '';
    for (let i=0; i < txt.length; i++) {
        let ch = txt[i];
        if (ch.toUpperCase() !== ch.toLowerCase()) {result += ch}
    }
    return result;
}


const validateBody = (body) => {
    if (!body.hasOwnProperty('name')) return false;
    if (!body.name) return false;
    if (!typeof body.name === 'string') return false;
    if (!isNaN(body.name)) return false;

    return filterInvalidCharts(body.name)
}
    

async function postCategory(req, res, next) {
    try {
        const name = validateBody(req.body)

        if (!name) { return next({status: 400, message: 'Bad body request'})};

        const newCategory= {...req.body, name: name.toLowerCase()}
        const postedCategory = await Category.create(newCategory);
        return res.status(200).json(postedCategory)
    } catch (error) {
        next({status: 409, message: 'Category already exists'});
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
            if (!validateBody(name)) {return next({status: 400, message: 'Bad body request'})};
            console.log()
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
        if (isNaN(categoryId)) {return next({status: 400, message: 'Bad ID format'})}

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
    
    try {
        const name = validateBody(req.body)
        
        if (!name) {return next({status: 400, message: 'Bad body request'})};

        const body = {...req.body, name: name.toLowerCase()}         
        const HEADERS = Object.keys(body)   
                                   
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