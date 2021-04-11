import express from 'express';
import Users from '../models/User.js';
import { registerValidation } from '../validation/validation.js';
import bcrypt from 'bcryptjs';
const router = express.Router();


router.post('/', async (req, res) => {

    //Data Validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message); 

    //Check if the user is already in database
    const emailExist = await Users.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send({message: "Email already exists"});

    const usernameExist = await Users.findOne({username: req.body.username});
    if (usernameExist) return res.status(400).send({message: "Username already exists"});

    //If validation went correctly: 
    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const user = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    try{
        await user.save();
        res.send({message: "User has been created! To authorize your account, check your e-mail box"});
    } catch (err){
        res.status(400).send(err); //status 400 -> bad request 
    }
    
});

export default router;