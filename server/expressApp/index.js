const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const router = require("./routes");
const path = require("path");
//passport
require("./passport/passportLocal");

const port = parseInt(process.env.PORT, 10) || 9000;

class ExpressApp {
    start() {
        const server = express();
        const allowedOrigins = [
            'http://localhost:3000'
            ,'http://www.zhengweiyong.com'
        ];

        server.use(function (req, res, next) {
            const origin = req.headers.origin;
            if(allowedOrigins.indexOf(origin) > -1){
                res.setHeader('Access-Control-Allow-Origin', origin);
            }
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header('Access-Control-Allow-Credentials', 'true');
            next();

        });
        server.use(express.static(path.resolve(__dirname, "static/build")));
        server.use(express.static(path.resolve(__dirname, "static/resource")));
        //server.use(session({ secret: 'secretkey', resave: false, saveUninitialized: false }));
        server.use(cookieParser());
        server.use(bodyParser());
        server.use(session({secret: 'keyboard cat'}));
        server.use(passport.initialize());
        server.use(passport.session());
        server.use(router);
        server.listen(port, (err) => {
            if (err) throw err;
        });
    }
}

module.exports = ExpressApp;
