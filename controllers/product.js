const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const isAuth = require('./isAuth');

const User = require('../models/user');
const Store = require('../models/store');
const Category = require('../models/category');
const Product = require('../models/product');

router.post('/addCategory', isAuth, async(request,response) => {
    const accountId = request.account._id;
    const store = await Store.findOne({associateId: accountId});
    const categoryId = mongoose.Types.ObjectId();
    const { categoryName, categoryImage, priority } = request.body;
    const _category = new Category({
        _id: categoryId,
        storeId: store._id,
        categoryName: categoryName,
        categoryImage: categoryImage,
        priority: priority
    });
    _category.save()
    .then(category_created => {
        return response.status(200).json({
            status: true,
            message: category_created
        });
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        });
    })
});
router.put('/updateCategory', isAuth, async(request,response) => { });
router.delete('/deleteCategory', isAuth, async(request,response) => { });
router.post('/addProduct', isAuth, async(request,response) => { });
router.put('/updateProduct', isAuth, async(request,response) => { });
router.delete('/deleteProduct', isAuth, async(request,response) => { });


module.exports = router;