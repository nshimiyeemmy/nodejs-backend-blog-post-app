const express = require("express");
const router = express.Router();
const {validate,Post_Types} =require("../../models/post_types/post_types.model")

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
    router.post('/', async(req,res) =>{
        try {
            const{error} = validate(req.body);
            if(error)return res.send(error.details[0].message);
            const post_type_exist = await Post_Types.findOne({title: req.body.title});
            if(post_type_exist)
            return res.send("Post Type already exists");
                //this posts/saves data into the database table post
                const newPost_Types = new Post_Types(req.body);
                const saved = await newPost_Types.save();
                return res.send(saved);
            
        } catch (error) {
            console.log(error)
        }
    });

module.exports = router