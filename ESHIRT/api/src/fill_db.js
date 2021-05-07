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

const category1 = {
    "name": "music"
}

const category2 = {
    "name": "movies"
}

const category3 = {
    "name": "sports"
}

const shirt1 = {
    "userId": "1",
    "categoryId": "1",
    "name": "SHIRT1",
    "color": "green",
    "model": "cuello-v2",
    "size": "M",
    "print": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ2m0RU6jww4i6PMly3spXAJzkIKPdsV-cBKWZDlOdTwf0PSYV9i1M5hGkVzMBiOnM7rVo_5k&usqp=CAc2",
    "score": "5",
    "public": "true"
}


const shirt2 = {
    "userId": "1",
    "categoryId": "1",
    "name": "SHIRT2",
    "color": "blue",
    "model": "cuello-v2",
    "size": "M",
    "print": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ2m0RU6jww4i6PMly3spXAJzkIKPdsV-cBKWZDlOdTwf0PSYV9i1M5hGkVzMBiOnM7rVo_5k&usqp=CAc2",
    "score": "3",
    "public": "true"
}

const shirt3 = {
    "userId": "2",
    "categoryId": "2",
    "name": "SHIRT3",
    "color": "white",
    "model": "cuello-v2",
    "size": "M",
    "print": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ2m0RU6jww4i6PMly3spXAJzkIKPdsV-cBKWZDlOdTwf0PSYV9i1M5hGkVzMBiOnM7rVo_5k&usqp=CAc2",
    "score": "3",
    "public": "true"
}

async function fillDB () {
    try {
    const postedUser1 = await User.create(user1);
    const postedUser2 = await User.create(user2);
    const categoryPosted1 = await Category.create(category1);
    const categoryPosted2 = await Category.create(category2);
    const categoryPosted3 = await Category.create(category3);
    const shirtPosted1 = await Shirt.create({...shirt1, created_by_user: true});
    await shirtPosted1.addCategory(categoryPosted1.id);
    const shirtPosted2 = await Shirt.create({...shirt2, created_by_user: true});
    await shirtPosted2.addCategory(categoryPosted2.id);
    const shirtPosted3 = await Shirt.create({...shirt3, created_by_user: true});
    await shirtPosted3.addCategory(categoryPosted1.id);
    await shirtPosted3.addCategory(categoryPosted2.id);
    await shirtPosted3.addCategory(categoryPosted3.id);
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    fillDB
}

