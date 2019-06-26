const express = require('express');
const MongooseApp = require("../../mongooseApp");

const router = express.Router();

router.post("/register", (req, res, next) => {
    const { username, password } = req.body;
    MongooseApp.getInstance().createUser( username, password ).then(user => {
        req.login(user, err => {
            if (err) next(err);
            else res.redirect("/");
        });
    })
        .catch(err => {
            if (err.name === "ValidationError") {
                req.flash("Sorry, that username is already taken.");
                res.redirect("/register");
            } else next(err);
        });

});
module.exports = router;
