const { Router } = require('express');
const { authenticate } = require('../middlewares/authenticate.middleware');
const cookieParser = require('cookie-parser');
const { blogModel } = require('../models/blog.model');
const { authorize } = require('../middlewares/authorize.middleware');

const blogRouter = Router();

blogRouter.use(cookieParser());


blogRouter.get('/', authenticate, async (req, res) => {
    const blogs = await blogModel.find({ user_id: req.body.user_id });

    res.send({blogs});
})

blogRouter.post('/create', authenticate, async (req, res) => {
    try {

        const { user_id, data } = req.body;
        console.log(req.body);
        const blog = new blogModel({ user_id, data })
        await blog.save();
        res.send('blog created');
    } catch (error) {
        console.log(error);
    }
})

blogRouter.put('/updateblog/:id', authenticate, async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await blogModel.findById({ _id: id });

        if (blog.user_id == req.body.user_id) {
            await blogModel.findByIdAndUpdate({ _id: id }, { data: req.body.data });
            res.send('blog updated');
        }
        else {
            res.send('not authorized');
        }

    } catch (error) {

    }

})

blogRouter.delete('/deleteblog/:id',authenticate,authorize(['User','Moderator']), async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await blogModel.findById({ _id: id });
        if (blog.user_id == req.body.user_id) {
            await blogModel.findByIdAndDelete({ _id: id });
            res.send('blog deleted');
        }
        else {
            res.send('not authorized');
        }


    } catch (error) {
        
    }
})

// blogRouter.get('/',async (req,res)=>{
//     res.send('all blogs');
// })




module.exports = { blogRouter };