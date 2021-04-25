import express from 'express';
import Users from '../models/User.js';
import { registerValidation } from '../validation/validation.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendMail } from '../controllers/mailer.js';
const router = express.Router();


router.post('/', async (req, res) => {

    //Data Validation
    const { error } = registerValidation(req.body);
    
    if (error) return res.status(400).send({
            message: error.details[0].message
    }); 

    //Check if the user is already in database
    const emailExist = await Users.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send({message: "Email already exists"});

    const usernameExist = await Users.findOne({username: req.body.username});
    if (usernameExist) return res.status(400).send({message: "Username already exists"});

    //If validation went correctly: 
    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const authToken = crypto.randomBytes(20).toString('hex');

    //setting up the expires time to 24 hours from token generating
    const authTokenExpires = Date.now() + 24 * 3600 * 1000;
    
    const user = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        authToken: authToken,
        authTokenExpires: authTokenExpires
    });
    
    const authLink = `http://localhost:2000/authorize/${authToken}`;
    
    sendMail({
        to: req.body.email,
        subject: 'Authorization',
        html: `To authorize the account, click <a href="${authLink}"> here </a>`
    })
    
    try{
        await user.save();
        res.status(200).send({message: "User has been created! To authorize your account, check your e-mail box"});
    } catch (err){
        res.status(400).send(err); //status 400 -> bad request 
    }
    
});

export default router;