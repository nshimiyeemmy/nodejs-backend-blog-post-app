//in database connection file you should require the mongoose w/c helps us to connect to DB && the path to database
const mongoose = require("mongoose");
const path = "mongodb://localhost:27017/Blog-Database";

//promise
mongoose.connect(path, {
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex: true
    //when one of your schema objects has a unique value always set useCreateIndex: true else you will always see depreciation warnings in your console
}).then(response => console.log("Connection to Database was Succcessfull!!!")).catch(error=> console.log("Failed to connect to Database.Try Again!"));
// this will return "Failed to connect to Database.Try Again!" when path to mongo DB database is wrong.
