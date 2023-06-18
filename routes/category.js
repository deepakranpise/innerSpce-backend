var express = require('express');
var router = express.Router();

const { requireSignin } = require('../middleware');
const { addProductMaster, getProductMaster } = require('../controller/productMaster');
const { addCategory, getCategories } = require('../controller/category');


/* GET users listing. */
router.post('/', requireSignin, addCategory);
router.get('/get', requireSignin, getCategories);


module.exports = router;
