const express = require("express");
const { AUTH_MIDDLEWARE } = require("../../middlewares/auth");
const router = express.Router();
const {validate,Post} =require("../../models/posts/posts.model");
const { Post_Types } = require("../../models/post_types/post_types.model");

router.get("/",async(req,res) =>{
    // //this will display in your console terminal not the post man
    // console.log("This is Post from Nshimiye Emmy");
    try {
        const posts = await Post.find();
        return res.status(200).send(posts);

    } catch (error) {
        console.log(error); 
    }
});
    router.post('/', [AUTH_MIDDLEWARE], async(req,res) =>{
        try {

            const{error} = validate(req.body);
            if(error) return res.send(error.details[0].message);
            
            const post_types = await Post_Types.findOne({_id: req.body.post_types})
            if(!post_types) return res.send("Post type does not exist");
                //this posts/saves data into the database table post                 
                const newPost = new Post(req.body);
                const saved = await newPost.save();
                return res.send(saved);
            
        } catch (error) {
            console.log(error)
        }
    });

module.exports = router