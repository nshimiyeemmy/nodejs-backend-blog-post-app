const express = require("express")
const {validate, User} = require("../../models/users/users.model")
const router = express.Router();
//routers help use to do endpoints of express(api's);

//getting all the users
router.get('/', async (req,res)=>{
    try {
        const users = await User.find();
        //if there is no user found in the table users return below
        if(users.length<1) return res.send("No user found!!");
        return res.status(200).send(users);

    } catch (error) {
        console.log(error);
    }
});


//getting user by their roles
router.get('/roles/:role',  async (req,res)=>{
    try {
        const user = await User.find({role: req.params.role});
        if (!user) 
        return res.status(404).send('User not found')
        return res.status(200).send(user);

    } catch (error) {
        console.log(error);
    }
});



//getting the user by id
router.get('/:id',  async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) 
        return res.status(404).send('User not found')
        return res.status(200).send(user);

    } catch (error) {
        console.log(error);
    }
});
//posting the users
router.post('/',async(req,res) =>{
    try {
        const {error} = validate(req.body); 
        if (error) return res.send(error.details[0].message);
        //finding if the email exists
        const emailExists = await User.findOne({email: req.body.email});
        if(emailExists)
        return res.send("Email already exists");
        //else do below
        const newUser = new User(req.body);
        const saved = await newUser.save();
       return res.send(saved);
    } catch (error) {
        console.log(error);
    }
});
//this is to update the entire user contents
router.put('/:id',async(req,res) =>{
    try {

        const{error} = validate(req.body);
        if(error) return res.send(error.details[0].message)

        const user = await User.findById(req.params.id);
        if (!user) return res.send('Ntawe');
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.send(updated);   
    } catch (error) {

        console.log(error)
        
    }
})

//this is updating some contents of the user
router.put('/:id',async(req,res) =>{
    try {

        const{error} = validate(req.body);
        if(error) return res.send(error.details[0].message)

        const user = await User.findById(req.params.id);
        if (!user) return res.send('Ntawe');
        const updated = await User.findByIdAndUpdate(req.params.id, {first_name: req.body.first_name,last_name:req.body.last_name}, {new: true});
        return res.send(updated);   
    } catch (error) {

        console.log(error)
        
    }
})

//api to delete data from the user;

router.delete('/:id',async(req,res)=>{

try {

    const user = await User.findById(req.params.id);
    if(!user) return res.send("User does not exists");
    const deleted = await User.findByIdAndDelete(req.params.id);
    //below we returned the object that you deleted
    return res.send(deleted);
    //you can also return a message after deleting a user instead of returning the object
    // do it like this  :    return res.send("User deleted successfully");
    
} catch (error) {
    console.log(error);   
}
});

//api to logg users into the system
router.post('/login',async(req,res) =>{
    try {
        const user = await User.findOne({email: req.body.email, password: req.body.password});
        if(!user)
        return res.send("Invalid Credentials");
        //else do below
        return res.send(user.generateAuthToken());
    } catch (error) {
        console.log(error);
    }
});
//


module.exports = router