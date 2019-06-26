const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/authenticate',passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
    res.end(JSON.stringify({a:123}));
});

module.exports = router;
