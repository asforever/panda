const mongoose = require("mongoose");
const config = require("../config/index");
const User = require("./models/User");


class MongooseApp {
    static getInstance() {
        if (!MongooseApp._ins) MongooseApp._ins = new MongooseApp();
        return MongooseApp._ins;
    }

    start() {
        mongoose.connect(config.mongondb.url, {useNewUrlParser: true})
        // .then(() => console.log("success db"), err => console.error("error db"));
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => console.log("success db"));
    }

    findUser(username, password) {
        return new Promise((r, j) => {
            User.findOne({username: username}, function (err, user) {
                if (err) {
                    return {err: err};
                }
                if (!user || !user.validPassword(password)) {
                    return {message: "Invalid username/password"};
                } else {
                    return {user: user};
                }

            });
        });
    }

    createUser(username, password) {
        return User.create({username, password})
    }
}


module.exports = MongooseApp;
