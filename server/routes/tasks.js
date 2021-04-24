import express from 'express';
import Users from '../models/User.js';
import { verify } from '../tokens/verifyToken.js';
const router = express.Router();


//returns all tasks
router.get('/', verify, async (req, res) => {
    try {
        const tasks = await Users.findOne({_id: req.user._id}); //returns User object from momngodb
        res.json(tasks.tasks); //response only with user's tasks
    } catch (err) {
        res.json({message: err});
    }
});


//adding task for specific user with an _id
router.patch('/', verify, async (req, res) => {
    try{
        await Users.updateOne(
            {_id: req.user._id},
            {$push: {
                tasks: req.body.tasks
            }}
        );
        res.json({message: "task has been added"});
    } catch (err){
        res.json({message: err});
    }
});


//deleting specific task for specific user with an id
router.delete('/', verify, async (req, res) => {
    try{
        const found = await Users.findOne({_id: req.user._id}); //returns User object with matched params
        found.tasks.splice(req.body.index, 1); //delete specific tasks from an array of tasks in User object
        
        await found.save();
        
        res.json({message: 'task has been deleted'});
    } catch (err) {
        res.json({message: err});
    }
});

export default router;


