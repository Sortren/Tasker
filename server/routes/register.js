import express from 'express';
import Users from '../models/User.js';
const router = express.Router();

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
        res.status(400).send(err);
    }
    
});

export default router;