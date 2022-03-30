const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const isAuth = require('./isAuth');

const User = require('../models/user');
const Store = require('../models/store');
const Category = require('../models/category');
const Product = require('../models/product');

router.post('/addCategory', isAuth, async(request,response) => {});
router.put('/updateCategory', isAuth, async(request,response) => { });
router.delete('/deleteCategory', isAuth, async(request,response) => { });
router.post('/addProduct', isAuth, async(request,response) => { });
router.put('/updateProduct', isAuth, async(request,response) => { });
router.delete('/deleteProduct', isAuth, async(request,response) => { });


module.exports = router;