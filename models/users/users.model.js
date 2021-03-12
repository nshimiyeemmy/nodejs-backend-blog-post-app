const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
//this below is defining our schema of data we want from the user
const userSchema = mongoose.Schema({
    first_name: {
        type:String,
        required:true,
        maxLength:20,
        minLength:5,
    },
    last_name: {
        type:String,
        required:true,
        maxLength:20,
        minLength:5,
    },
    email: {
        type:String,
        unique: true,
        require:true,
    },
    role: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
});
//hashing the password
userSchema.pre('save',async function(next){
    try {
        // console.log("Called before saving a user");
    const salt = await bcrypt.genSalt(10);
    const hashedPasswaord = await bcrypt.hash(this.password,salt);
    this.password = hashedPasswaord;
    next();
    } catch (error) {
        next(error)
    }   
})
//creating a method to generate the token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        id: this._id,
        fullnames: this.first_name + " " + this.last_name,
        email: this.email        
    }, config.get("KEY"));
}
//this is giving the name to a table where data from this user schema will be stored
const User = new mongoose.model("Users",userSchema);

//creating a function to validate data from the user
function validate(data) {
    const Schema = Joi.object({
       first_name: Joi.string().min(5).max(20).required() ,
       last_name:Joi.string().min(5).max(20).required(),
       email:Joi.string().email().required(),
       role:Joi.string().required(),
       password:Joi.string().required(),
    });
    return Schema.validate(data);
    
}
module.exports.validate = validate;
//here below we are exporting the model=User
module.exports.User = User;

