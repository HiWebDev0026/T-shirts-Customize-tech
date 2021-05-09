const {User, Category, Shirt} = require('./db.js')

const user1 = {
    "name": "USER1",
    "email": "USER1@gmail.com",
    "password": "ASDWTDY",
    "country": "argentine",
    "city": "BARILOCHE",
    "adress": "CABILDO 1234",
    "phone": "111111111" 
}

const user2 = {
    "name": "USER2",
    "email": "USER2@gmail.com",
    "password": "ASDWTDY2",
    "country": "argentine",
    "city": "BARILOCHE",
    "adress": "CABILDO 1234",
    "phone": "222222222" 
}

const user3 = {
    "name": "USER3",
    "email": "USER3@gmail.com",
    "password": "ASDWTDY3",
    "country": "colombia",
    "city": "BOGOTA",
    "adress": "CALLE 94A32",
    "phone": "333333333" 
}

const user4 = {
    "name": "USER4",
    "email": "USER4@gmail.com",
    "password": "ASDWTDY4",
    "country": "colombia",
    "city": "CALI",
    "adress": "CALLE 94A32",
    "phone": "444444444" 
}

const user5 = {
    "name": "USER5",
    "email": "USER5@gmail.com",
    "password": "ASDWTDY5",
    "country": "colombia",
    "city": "MEDELLIN",
    "adress": "CALLE 94A32",
    "phone": "555555555" 
}

const user6 = {
    "name": "USER6",
    "email": "USER6@gmail.com",
    "password": "ASDWTDY6",
    "country": "colombia",
    "city": "BARRANQUILLA",
    "adress": "CALLE 94A32",
    "phone": "666666666" 
}

const category1 = {
    "name": "music"
}

const category2 = {
    "name": "movies"
}

const category3 = {
    "name": "sports"
}

const category4 = {
    "name": "code"
}

const category5 = {
    "name": "marvel"
}

const category6 = {
    "name": "dc"
}

const shirt1 = {
    "userId": "1",
    "categoryId": "1",
    "name": "SHIRT1",
    "color": "white",
    "model": "cuello-v2",
    "size": "M",
    "print": "http://www.wellcoders.com/images/GARMENTS/D/W/V/W/MAIN/d2087xWxVxWxMAIN.jpg",
    "score": "5",
    "public": "true"
}

const shirt2 = {
    "userId": "1",
    "categoryId": "1",
    "name": "SHIRT2",
    "color": "black",
    "model": "cuello-v2",
    "size": "M",
    "print": "https://images1.teeshirtpalace.com/images/productImages/av/ChillinWithMyVillainsHorrorMovieFunny/productImage/ChillinWithMyVillainsHorrorMovieFunny-black-av-front.jpg?width=713",
    "score": "3",
    "public": "true"
}

const shirt3 = {
    "userId": "2",
    "categoryId": "2",
    "name": "SHIRT3",
    "color": "black",
    "model": "cuello-u",
    "size": "M",
    "print": "https://cdn.shopify.com/s/files/1/0443/3113/9234/products/t-shirt-femme-jpeux-pas-jai-pole-dance-noir-494817.jpg?v=1604670113",
    "score": "3",
    "public": "true"
}

const shirt4 = {
    "userId": "3",
    "categoryId": "4",
    "name": "SHIRT4",
    "color": "white",
    "model": "cuello-u",
    "size": "L",
    "print": "https://designyourown.pk/wp-content/uploads/2017/06/design-your-own-tshirt-creo-design-02-white-programmer-t-shirt.jpg",
    "score": "5",
    "public": "true"
}

const shirt5 = {
    "userId": "4",
    "categoryId": "4",
    "name": "SHIRT5",
    "color": "white",
    "model": "cuello-u",
    "size": "S",
    "print": "https://rlv.zcache.com/trust_me_im_a_programmer_t_shirt-rd8277d0fe0424aedbff652af6dcbfd49_k2gr0_704.jpg",
    "score": "3",
    "public": "true"
}

const shirt6 = {
    "userId": "5",
    "categoryId": "4",
    "name": "SHIRT6",
    "color": "black",
    "model": "cuello-u",
    "size": "M",
    "print": "https://i.ebayimg.com/images/g/iz8AAOSw3bxa-tIQ/s-l400.jpg",
    "score": "4",
    "public": "true"
}

const shirt7 = {
    "userId": "6",
    "categoryId": "4",
    "name": "SHIRT7",
    "color": "blue",
    "model": "cuello-u",
    "size": "S",
    "print": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTADiSQf5x6Jp-1RBYXJNVspzABU6d8pC9a7Cyhs1c5UDHFjmtEITpS1wvifwJkeF4rdv8&usqp=CAU",
    "score": "3",
    "public": "true"
}

const shirt8 = {
    "userId": "1",
    "categoryId": "4",
    "name": "SHIRT8",
    "color": "black",
    "model": "cuello-u",
    "size": "L",
    "print": "https://image.spreadshirtmedia.com/image-server/v1/mp/products/T1130A2MPA3365PT17X37Y36D1016892376FS5093/views/1,width=378,height=378,appearanceId=2,backgroundColor=F2F2F2,modelId=1567,crop=list/life-of-a-coder-unisex-poly-cotton-t-shirt.jpg",
    "score": "4",
    "public": "true"
}

const shirt9 = {
    "userId": "2",
    "categoryId": "4",
    "name": "SHIRT9",
    "color": "black",
    "model": "cuello-u",
    "size": "M",
    "print": "https://ae01.alicdn.com/kf/H3c52791bd1924c4c842e68faa8f0aa38h/While-Alive-Programmer-T-shirt-Live-Eat-Code-Eat-Sleep-Simple-Letter-Design-Geek-Coder-Tshirt.jpg",
    "score": "3",
    "public": "true"
}

const shirt10 = {
    "userId": "3",
    "categoryId": "5",
    "name": "SHIRT10",
    "color": "grey",
    "model": "cuello-u",
    "size": "M",
    "print": "https://i.pinimg.com/originals/9c/54/bf/9c54bfc69b999cd3d3ba3d606e2a63c5.jpg",
    "score": "5",
    "public": "true"
}

const shirt11 = {
    "userId": "4",
    "categoryId": "6",
    "name": "SHIRT11",
    "color": "black",
    "model": "cuello-u",
    "size": "S",
    "print": "http://i.ebayimg.com/images/g/8lkAAOSwPW9a11Vn/s-l500.jpg",
    "score": "4",
    "public": "true"
}

const shirt12 = {
    "userId": "5",
    "categoryId": "5",
    "name": "SHIRT12",
    "color": "grey",
    "model": "cuello-u",
    "size": "S",
    "print": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ2m0RU6jww4i6PMly3spXAJzkIKPdsV-cBKWZDlOdTwf0PSYV9i1M5hGkVzMBiOnM7rVo_5k&usqp=CAc2",
    "score": "3",
    "public": "true"
}

const shirt13 = {
    "userId": "6",
    "categoryId": "6",
    "name": "SHIRT13",
    "color": "blue",
    "model": "cuello-v2",
    "size": "M",
    "print": "https://i.pinimg.com/originals/dd/3d/ea/dd3dea922eb5b832305d23775af66843.jpg",
    "score": "3",
    "public": "true"
}

const shirt14 = {
    "userId": "1",
    "categoryId": "5",
    "name": "SHIRT14",
    "color": "white",
    "model": "cuello-v2",
    "size": "M",
    "print": "https://i5.walmartimages.com/asr/e8cb39ce-6e2e-46c8-8318-65869cced8a9_1.aee461e6b5af4cdd7ade2db22301db02.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff",
    "score": "4",
    "public": "true"
}

const shirt15 = {
    "userId": "2",
    "categoryId": "4",
    "name": "SHIRT15",
    "color": "white",
    "model": "cuello-v2",
    "size": "M",
    "print": "https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg",
    "score": "3",
    "public": "true"
}

    
const setToLower = (array) => {
    for (const body of array) {
        for (const field in body) {
            if (field !== 'print' && field !== 'size' && field !== 'public') {
                body[field] = body[field].toLowerCase()
            }
        }    
    }
}


async function fillDB () {
    setToLower([
        shirt1, shirt2, shirt3, shirt4, shirt5, shirt6, shirt7, shirt8, 
        shirt9, shirt10, shirt11, shirt12, shirt13, shirt14, shirt15
    ]) // sets all names and properties to lower case    
    try {
    const postedUser1 = await User.create(user1);
    const postedUser2 = await User.create(user2);
    const postedUser3 = await User.create(user3);
    const postedUser4 = await User.create(user4);
    const postedUser5 = await User.create(user5);
    const postedUser6 = await User.create(user6);
    const categoryPosted1 = await Category.create(category1);
    const categoryPosted2 = await Category.create(category2);
    const categoryPosted3 = await Category.create(category3);
    const categoryPosted4 = await Category.create(category4);
    const categoryPosted5 = await Category.create(category5);
    const categoryPosted6 = await Category.create(category6);
    const shirtPosted1 = await Shirt.create({...shirt1, created_by_user: true});
    await shirtPosted1.addCategory(categoryPosted1.id);
    const shirtPosted2 = await Shirt.create({...shirt2, created_by_user: true});
    await shirtPosted2.addCategory(categoryPosted2.id);
    const shirtPosted3 = await Shirt.create({...shirt3, created_by_user: true});
    await shirtPosted3.addCategory(categoryPosted1.id);
    await shirtPosted3.addCategory(categoryPosted2.id);
    await shirtPosted3.addCategory(categoryPosted3.id);
    const shirtPosted4 = await Shirt.create({...shirt4, created_by_user: true});
    await shirtPosted4.addCategory(categoryPosted4.id);
    const shirtPosted5 = await Shirt.create({...shirt5, created_by_user: true});
    await shirtPosted5.addCategory(categoryPosted4.id);
    const shirtPosted6 = await Shirt.create({...shirt6, created_by_user: true});
    await shirtPosted6.addCategory(categoryPosted4.id);
    const shirtPosted7 = await Shirt.create({...shirt7, created_by_user: true});
    await shirtPosted7.addCategory(categoryPosted4.id);
    const shirtPosted8 = await Shirt.create({...shirt8, created_by_user: true});
    await shirtPosted8.addCategory(categoryPosted4.id);
    const shirtPosted9 = await Shirt.create({...shirt9, created_by_user: true});
    await shirtPosted9.addCategory(categoryPosted4.id);
    const shirtPosted10 = await Shirt.create({...shirt10, created_by_user: true});
    await shirtPosted10.addCategory(categoryPosted5.id);
    const shirtPosted11 = await Shirt.create({...shirt11, created_by_user: true});
    await shirtPosted11.addCategory(categoryPosted6.id);
    const shirtPosted12 = await Shirt.create({...shirt12, created_by_user: true});
    await shirtPosted12.addCategory(categoryPosted5.id);
    const shirtPosted13 = await Shirt.create({...shirt13, created_by_user: true});
    await shirtPosted13.addCategory(categoryPosted6.id);
    const shirtPosted14 = await Shirt.create({...shirt14, created_by_user: true});
    await shirtPosted14.addCategory(categoryPosted5.id);
    const shirtPosted15 = await Shirt.create({...shirt15, created_by_user: true});
    await shirtPosted15.addCategory(categoryPosted4.id);
    
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    fillDB
}

