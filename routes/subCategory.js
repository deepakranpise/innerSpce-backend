var express = require('express');
var router = express.Router();

const { requireSignin } = require('../middleware');
const { addSubCategory, getSubCategories } = require('../controller/subCategory');


/* GET users listing. */
router.post('/', requireSignin, addSubCategory);
router.get('/get', requireSignin, getSubCategories);


module.exports = router;
