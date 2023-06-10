var express = require('express');
var router = express.Router();

const { requireSignin } = require('../middleware');
const { addProductMaster, getProductMaster } = require('../controller/productMaster');
const { addTransaction, getTransaction } = require('../controller/transaction');


/* GET users listing. */
router.post('/', requireSignin, addTransaction);
router.get('/get', requireSignin, getTransaction);


module.exports = router;
