const MongooseApp = require("./mongooseApp");
const ExpressApp = require("./expressApp");

let expressApp = new ExpressApp();
let mongooseApp = MongooseApp.getInstance();

mongooseApp.start();
expressApp.start();