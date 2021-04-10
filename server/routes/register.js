import express from 'express';
import Users from '../models/User.js';
import { registerValidation } from '../validation/validation.js';
const router = express.Router();


router.post('/', async (req, res) => {

    //Data Validation
    const { error } = registerValidation(req.body);
    
    if (error) return res.status(400).send(error.details[0].message); 

    //Check if the user is already in database
    const emailExist = await Users.findOne({email: req.body.email});
    
    if (emailExist) return res.status(400).send('Email already exists');

    const user = new Users({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try{
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err){
        res.status(400).send(err); //status 400 -> bad request 
    }
    
});

export default router;