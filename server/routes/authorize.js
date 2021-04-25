import express from 'express';
import Users from '../models/User.js';
import { verify } from '../tokens/verifyToken.js';
const router = express.Router();


router.get('/:authToken', async (req, res) =>{
    const foundUser = await Users.findOne({authToken: req.params.authToken});

    //if auth token date to expire is greater than current time, user will be authenticated
    if (foundUser.authTokenExpires > Date.now()){
        await Users.updateOne(
            {authToken: foundUser.authToken},
            {$set: {
                authorized: 'true'
            }}
        );
    }
})

export default router;