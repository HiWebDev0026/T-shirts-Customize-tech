const S = require('sequelize');
const Op = S.Op;
const {Category, Shirt} = require('../db.js');
// cambien los nombres de las functions
// renombrar los archivos controller.js cuando estén las rutas definidas

// COMENTARIO
    
async function postCategory(req, res, next) {
    
        
    try {
        const newCategory= req.body
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


module.exports = {
    postCategory,
    getCategories
}