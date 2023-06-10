var express = require('express');
var router = express.Router();

const { signIn, signUp, signOut } = require('../controller/auth');


/* GET users listing. */
router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/signOut', signOut);


module.exports = router;
