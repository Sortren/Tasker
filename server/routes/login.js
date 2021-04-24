import express from 'express';
import Users from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/', async (req, res) => {
    const foundUser = await Users.findOne({username: req.body.username});

    if (!foundUser){
        res.status(404).json({message: "account not found"});
    } else {
        const validPassword = await bcrypt.compare(req.body.password, foundUser.password);

        if (!validPassword){
            return res.status(401).json({message: "invalid password"});
        }

        const token = jwt.sign({
            _id: foundUser._id,
        }, process.env.TOKEN_SECRET);


        //setting up the header and json
        res.set({
            'jwt': token, 
            "Access-Control-Expose-Headers": "jwt"
        }).json({
            username: foundUser.username, 
            message: "token has been assigned"
        });
    }
});

export default router;