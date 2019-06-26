const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongooseApp = require("../../mongooseApp");

passport.use(new LocalStrategy(
    function (username, password, done) {
        mongooseApp.getInstance().findUser(username, password).then(function (data) {
            let {err, user, message} = data;
            if (err) return done(err);
            if (user) return done(null, user);
            if (message) return done(null, false, {message: "Invalid username/password"});
        });
    }
));
module.exports = passport;