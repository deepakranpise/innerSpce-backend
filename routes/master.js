var express = require('express');
var router = express.Router();

const { requireSignin } = require('../middleware');
const { addProductMaster, getProductMaster } = require('../controller/productMaster');


/* GET users listing. */
router.post('/', requireSignin, addProductMaster);
router.get('/get', requireSignin, getProductMaster);


module.exports = router;
