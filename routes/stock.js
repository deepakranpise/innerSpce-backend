var express = require('express');
var router = express.Router();

const { addStock, getStocks } = require('../controller/stock');
const { requireSignin } = require('../middleware');


/* GET users listing. */
router.post('/', requireSignin, addStock);
router.get('/get', requireSignin, getStocks);


module.exports = router;
