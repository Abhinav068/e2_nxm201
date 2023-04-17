const { model, Schema } = require('mongoose');

const blogModel = model('blog', Schema({
    user_id: { type: String, required: true },
    data:String
}))

module.exports={blogModel};