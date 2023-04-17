const express=require('express');
const { connection } = require('./config/db');
const { userRouter } = require('./routers/user.router');
const { blogRouter } = require('./routers/blog.router');
require('dotenv').config();


const app=express();
app.use(express.json());
app.use('/user',userRouter)
app.use('/blog',blogRouter)

const port=process.env.port;

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
    // res.send('blogs Homepage');
})

// app.get('/',(req,res)=>{
    // res('blog Homepage');
// })

app.listen(port,async()=>{
    await connection;
    console.log(`listening at ${port}`);
})