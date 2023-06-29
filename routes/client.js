var express = require('express');
var router = express.Router();

const { requireSignin } = require('../middleware');
const { addclient, getclients } = require('../controller/clientMaster');


/* GET users listing. */
router.post('/', requireSignin, addclient);
router.get('/get', requireSignin, getclients);


module.exports = router;
