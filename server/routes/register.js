import express from 'express';
import Users from '../models/User.js';
const router = express.Router();

//VALIDATION
// import Joi from '@hapi/joi';
// const validationSchema = {
//     username: Joi.string().min(6).required(),
//     email: Joi.string().min(6).required().email()
// }


router.post('/', async (req, res) => {
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