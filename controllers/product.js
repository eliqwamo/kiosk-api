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
router.put('/updateCategory/:categoryId', isAuth, async(request,response) => {

    const { categoryName, categoryImage, priority } = request.body;
    const cid = request.params.categoryId;

    Category.findById(cid)
    .then(category => {
        if(category){
            category.categoryName = categoryName;
            category.categoryImage = categoryImage;
            category.priority = priority;
            return category.save()
            .then(category_updated => {
                return response.status(200).json({
                    status: true,
                    message: category_updated
                });
            })
        } else {
            return response.status(200).json({
                status: false,
                message: 'Category not found'
            });
        }
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        });
    })
});
router.delete('/deleteCategory/:categoryId', isAuth, async(request,response) => {
    const cid = request.params.categoryId;
    Category.findByIdAndDelete(cid)
    .then(category_deleted => {
        return response.status(200).json({
            status: true,
            message: category_deleted
        })
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        })
    })
 });
router.post('/addProduct', isAuth, async(request,response) => { });
router.put('/updateProduct', isAuth, async(request,response) => { });
router.delete('/deleteProduct', isAuth, async(request,response) => { });
router.get('/getAllCategories', isAuth, async(request,response) => {
    const accountId = request.account._id;
    const store = await Store.findOne({associateId: accountId});
    Category.find({storeId: store._id})
    .then(categories => {
        return response.status(200).json({
            status: true,
            message: categories
        });
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        });
    })
 });
 router.get('/getCategory/:categoryId', isAuth, async(request,response) => {
    const cid = request.params.categoryId;
    Category.findById(cid)
    .then(category => {
        return response.status(200).json({
            status: true,
            message: category
        });
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        });
    })
 });
router.get('/getAllProducts', isAuth, async(request,response) => {
    const accountId = request.account._id;
    const store = await Store.findOne({associateId: accountId});
    Product.find({storeId: store._id})
    .then(products => {
        return response.status(200).json({
            status: true,
            message: products
        });
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        });
    })
 });
 router.get('/getProductsByCategoryId/:categoryId', isAuth, async(request,response) => {
    const accountId = request.account._id;
    const categoryId = request.params.categoryId;
    const store = await Store.findOne({associateId: accountId});
    Product.find({storeId: store._id, categoryId: categoryId})
    .then(products => {
        return response.status(200).json({
            status: true,
            message: products
        });
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        });
    })
 });


module.exports = router;