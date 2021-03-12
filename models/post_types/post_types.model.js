const Joi = require("joi");
const mongoose = require("mongoose")

const post_typesSchema = mongoose.Schema({
    post_type_name:{
        type:String,
        min:5,
        max:10,
        required:true,
        unique:true
    }
});

const Post_Types = new mongoose.model("Post_Types", post_typesSchema);

function validate(data) {
    const Schema = Joi.object({
        post_type_name:Joi.string().min(5).max(10).required()
    });
    return Schema.validate(data);   
}

module.exports.validate= validate;
module.exports.Post_Types = Post_Types;