import express from 'express';
import Users from '../models/User.js';
import { verify } from '../tokens/verifyToken.js';
const router = express.Router();


//returns all tasks
router.get('/', verify, async (req, res) => {
    try {
        const user = await Users.findOne({_id: req.user._id}); //returns User object from momngodb

        if (user.authorized){
            res.json(user.tasks);
        } else {
            res.json({message: 'Please authorize your account via link in your email box'});
        }

    } catch (err) {
        res.json({message: err});
    }
});


//adding task for specific user with an _id
router.patch('/', verify, async (req, res) => {
    try{
        const user = await Users.findOne({_id: req.user._id});

        if (user.authorized){
            await Users.updateOne(
                {_id: req.user._id},
                {$push: {
                    tasks: req.body.tasks
                }})
                res.json({message: "task has been added"});
            } else {
            res.json({message: 'Please authorize your account via link in your email box'});
        }
    } catch (err){
        res.json({message: err});
    }
});


//deleting specific task for specific user with an id
router.delete('/', verify, async (req, res) => {
    try{
        const user = await Users.findOne({_id: req.user._id}); //returns User object with matched params
        
        if (user.authorized){
            user.tasks.splice(req.body.index, 1); //delete specific task from an array of tasks in User object
            await user.save();
            res.json({message: 'task has been deleted'});
        } else {
            res.json({message: 'Please authorize your account via link in your email box'});
        }
    } catch (err) {
        res.json({message: err});
    }
});

export default router;


