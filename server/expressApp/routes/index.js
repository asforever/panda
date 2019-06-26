const express = require("express");
const root = require('./root');
const logout = require('./logout');
const register = require('./register');
const authenticate = require('./authenticate');


const router = express.Router();
router.get('*', (req, res, next) => {
    next();
    /*    if (req.isAuthenticated()) {
     } else {
     req.status = 401;
     req.body = {
     msg: 'auth fail'
     }
     }*/
});
router.use(root);
router.use(logout);
router.use(register);
router.use(authenticate);

module.exports = router;
