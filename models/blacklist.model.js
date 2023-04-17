const { model, Schema } = require('mongoose');

const blacklistModel = model('blacklist', Schema({
    token : String
}))

module.exports={blacklistModel};