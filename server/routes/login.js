import express from 'express';
import Users from '../models/User.js';
import bcrypt from 'bcryptjs';
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

        res.status(200).json({
            _id: foundUser._id,
            username: foundUser.username
        });
    }
});

export default router;