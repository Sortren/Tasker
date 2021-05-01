import express from 'express';
import Users from '../models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();


router.get('/:authToken', async (req, res) =>{
    const foundUser = await Users.findOne({authToken: req.params.authToken});

    //if auth token date to expire is greater than current time, user will be authenticated
    if (foundUser.authTokenExpires > Date.now()){
        await Users.updateOne(
            {authToken: foundUser.authToken},
            {$set: {
                authorized: 'true'
            }});
        console.log(__dirname);    
        res.sendFile('C:/Dokumenty/PROJECTS PROGRAMMING/js_projects/nodejs_projects/TO-DO-List/website/emailConfirm.html');
    }
})

export default router;