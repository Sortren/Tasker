import express from 'express';
import Users from '../models/User.js';
const router = express.Router();

router.post('/', async (req, res) => {
    const foundUser = await Users.findOne({username: req.body.username});

    if (!foundUser){
        res.status(404).json({message: "account not found"});
    } else {
        if (foundUser.password === req.body.password){
            res.status(200).json(foundUser); //returns User object from mongodb
        } else {
            res.status(401).json({message: "wrong password"});
        }
    }
});

export default router;
