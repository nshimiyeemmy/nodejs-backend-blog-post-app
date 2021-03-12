const express=require("express")
const mongoose = require("mongoose");
const createError = require('http-errors');
const bodyParser = require("body-parser")

const userController = require("./controllers/users/users.controllers")
const postController = require("./controllers/posts/posts.controller")
const post_typesController = require('./controllers/Post_Types/post_types.controller')
require("./models/db.js")
const app = express();
//these codes are used to validate request from the user
    //start of our app
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json());

app.use('/api/users', userController);
app.use('/api/posts',postController);
app.use('/api/post_types',post_typesController)
// app.get('/', (req,res)=>{
//     console.log("Server Application started successfully.")
// })
app.get('/',async(req,res,next) =>{
    res.send("Hello from Express And Welcome to Nodejs API Development!!")
    })
app.use('/',async(req,res,next)=>{
    next(createError.NotFound("This route does not Exists!!"));
})
    app.use('/',(err,req,res,next)=>{
        res.status(err.status || 500);
        res.send({
            error:{
            status:err.status || 500,
            message:err.message
        },
        })
    })

app.listen(2000, () => console.log("App running on port 2000"))
