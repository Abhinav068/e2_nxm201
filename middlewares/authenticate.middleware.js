const { } = require('mongoose');
const jwt = require('jsonwebtoken');
const { blacklistModel } = require('../models/blacklist.model');
require('dotenv').config();

const authenticate = (async (req, res, next) => {
    try {
        const { token, rtoken } = req.cookies;
        const blacklist = await blacklistModel.findOne({ token: rtoken });
        // console.log(blacklist);
        if (blacklist) {
            return res.send('plz login');

        }

        // console.log(req.cookies);
        jwt.verify(token, process.env.tk_secret, (err, decode) => {
            if (err) {
                // res.send({err});
                if (err.message == "jwt expired") {
                    jwt.verify(rtoken, process.env.rtk_secret, (err, decode2) => {
                        if (err) return res.send('plz login');
                        const token = jwt.sign({ email: decode2.email, role: decode2.role, id: decode2.id }, process.env.tk_secret, { expiresIn: 60 });
                        req.body.user_id = decode2.id;
                        req.body.role = decode2.role;
                        res.cookie('token', token);
                        next();

                    })
                }
                else {
                    res.send('plz login');
                }
            }
            else {
                // res.send({decode});
                req.body.user_id = decode.id;
                req.body.role = decode.role;
                next();

            }
        })
    } catch (error) {
        console.log({ error });
    }
})

module.exports = { authenticate };