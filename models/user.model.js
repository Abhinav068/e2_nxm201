const { model, Schema } = require('mongoose');

const UserModel = model('user', Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type:String,
        default: 'User',
        enum: ['User', 'Moderator']
    }
}))

module.exports={UserModel};