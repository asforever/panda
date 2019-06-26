const express = require('express');
const passport = require("passport");
const path = require("path");

const router = express.Router();

router.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname , "../static/build/index.html"), {maxAge: 0});
});
module.exports = router;
