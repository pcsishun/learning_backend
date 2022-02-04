const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {type: String, default:null},
    lastname:{type: String, default:null},
    email:{type: String, default:null},
    password:{type:String, default: null}
});

module.exports = mongoose.model('users', userSchema);

