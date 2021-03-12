const Joi = require("joi");
const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title:{
        type:String,
        min:5,
        max:10,
        required:true
    },
    description:{
        type:String,
        min:5,
        max:250,
        required:true
    },
    dateCreated:{
        type:Date,
        required:true
    },
    // //setting a foreign key
    post_types: {
        ref: 'Post_Types',
        type: mongoose.Schema.Types.ObjectId
    }
});

const Post = new mongoose.model("Post", postSchema);

function validate(data) {
    const Schema = Joi.object({
        title:Joi.string().min(5).max(10).required(),
        description:Joi.string().min(5).max(250).required(),
        dateCreated:Joi.date().required(),
        post_types:Joi.string().required()

    });
    return Schema.validate(data);   
}

module.exports.validate= validate;
module.exports.Post = Post;