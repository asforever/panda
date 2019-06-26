const mongoose = require('mongoose');
let UserSchema = mongoose.Schema({
    name: String,
    uuid: String
});

let Model = mongoose.model('Model', UserSchema);
module.exports =  Model;