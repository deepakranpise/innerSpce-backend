var express = require('express');
var router = express.Router();

const { requireSignin } = require('../middleware');
const { addProductMaster, getProductMaster } = require('../controller/productMaster');
const { addCategory, getCategories } = require('../controller/category');
const { addSize, getSizes } = require('../controller/sizeMaster');


/* GET users listing. */
router.post('/', requireSignin, addSize);
router.get('/get', requireSignin, getSizes);


module.exports = router;
