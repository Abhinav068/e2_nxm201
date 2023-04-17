const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { UserModel } = require('../models/user.model');
const { blacklistModel } = require('../models/blacklist.model');

const userRouter = Router();
userRouter.use(cookieParser());


userRouter.get('/', async (req, res) => {
    res.send('all users');
})

userRouter.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new UserModel({ email, password: bcrypt.hashSync(password, process.env.salt) });
        await user.save();
        res.send('user Registered');
    } catch (error) {
        console.log(error);
    }
})

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ email: user.email, role: user.role,id:user._id }, process.env.tk_secret, { expiresIn: 60 });
                const rtoken = jwt.sign({ email: user.email, role: user.role,id:user._id }, process.env.rtk_secret, { expiresIn: 60 * 3 });
                res.cookie('token', token);
                res.cookie('rtoken', rtoken);
                res.send({ token, rtoken });

            }
            else {
                return res.send('Wrong Credentials');
            }
        })
    } catch (error) {
        console.log(error);
    }
})


userRouter.post('/logout', async (req, res) => {
    try {
        // console.log(req.cookies);
        await blacklistModel({token:req.cookies.rtoken}).save();
        res.send('successfully logged out');
    } catch (error) {
        console.log(error);
    }
})


// userRouter.get('/',async (req,res)=>{
//     try {

//         res.send('all users');
//     } catch (error) {
//         console.log(error);
//     }
// })






module.exports = { userRouter };