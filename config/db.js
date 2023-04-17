const { connect }=require('mongoose');
require('dotenv').config();

const connection=connect(process.env.mongo_url)


module.exports={connection};