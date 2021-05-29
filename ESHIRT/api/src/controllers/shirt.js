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

    const modelFileds = ["name", "color", "model", "price", "size", "print", "score"]

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
    console.log('la concha de mi viejeehefhiufhwiu')   
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
    let status = req.query.status
    console.log(status)
    console.log(typeof status);
    // NEEDS REFACTORING
    try { 
        if (!name && !status) {
            
            const shirts = await Shirt.findAll({include: [Category]})
            return res.status(200).json(shirts)

        } else if(name && status) {
            name = name.toLowerCase()
            console.log(typeof status);
            const shirts = await Shirt.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    },
                    public: status
                    
                }, 
                include: [Category]
            })
            return res.status(200).json(shirts)

        } else if(!name && status) {
            const shirts = await Shirt.findAll({
                where: {
  
                    public: status
                    
                }, 
                include: [Category]
            })
            return res.status(200).json(shirts)
        }

    } catch (error) {
        next({status: 404, message: 'Shirt not found'});
    }
}

async function setDiscount(req, res, next) {
    const {discount} = req.body;
    const weekDay = discount.slice(0, discount.indexOf('-'));
    const category = discount.slice(discount.indexOf('-')+1, discount.indexOf('/'));
    /* console.log(category, discount); */
    const desc = discount.slice(discount.indexOf('/')+1);
    try {

        if(weekDay !== 'RESET' && category === 'ALL'){

        let response = await Shirt.findAll();
        response.forEach(async (elem) => {
            console.log(elem);
            if(parseInt(elem.latestPrice) > 0) {
                console.log('DISCOUNT ON:', elem.name, 'OF:', desc);
                await elem.setDataValue('discount', discount);
                elem.price = elem.latestPrice;
                elem.save();
            } else {

            await elem.setDataValue('discount', discount);
            await elem.setDataValue('latestPrice', elem.price);
            elem.price = elem.price;
            elem.save();
            }
            
            
          })

          return res.status(200).send('Changed discount on category' + req.body.discount)
        } else {

            let response = await Category.findAll({
                where: {
                    name: category
                },
                include: [Shirt],
            })
            if(weekDay !== 'RESET') {
            response.forEach(cat => {
                cat.shirts.forEach(async(elem)=> {
                    /* if(elem.discount?.slice(discount.indexOf('/')+1) > 0) {
                        res.status(400).send({
                            message: 'ERROR. Category has already a discount price assigned',
                        })
                    } else { */
                        if(parseInt(elem.latestPrice) > 0) {
                            await elem.setDataValue('discount', discount);
                            elem.price = elem.latestPrice;
                            elem.save();
                        } else {
                        
                        await elem.setDataValue('discount', discount);
                        await elem.setDataValue('latestPrice', elem.price);
                        elem.price = elem.price;
                        elem.save();
                    }
                })})
            
            return res.status(200).send('Changed discount on category' + req.body.discount)
        } else {
            if(category !== 'ALL') {
                console.log('here');
                response.forEach(async(cat)=> {
                    cat.shirts.forEach(async(elem)=> {
                        await elem.setDataValue('discount', 'Friday-ALL/0');
                        await elem.setDataValue('price', elem.latestPrice);
                        elem.save();
                    })
                })
                return res.status(200).send('Category discount reset on' + req.body.discount)
            } else {
                let response = await Shirt.findAll();
                response.forEach(async(elem)=> {
                    await elem.setDataValue('discount', 'Friday-ALL/0');

                    if(elem.latestPrice > 0) {
                        await elem.setDataValue('price', elem.latestPrice);
                        elem.save();
                    }
                })
                return res.status(200).send('All discounts reset to 0');
            }
        }
            
        }
    } catch(err) {
        console.log(err)
    }
}


async function setStock(req, res, next){
    const shirtId = req.body.shirtId;
    const newQtty = req.body.quantity;

    try {

        let response = await Shirt.findOne({where: {
            id: shirtId
        }})
 
        response.stock = newQtty;
        response.save();

        res.status(200).send('Shirt stock changed successfully');

    }catch(err) {

        next({message: 'Unable to set stock. Shirt not found', error: 404})

    }

}

module.exports = {
    postShirt,
    getShirts,
    getShirt,
    putShirt,
    deleteShirt,
    setDiscount,
    setStock
}