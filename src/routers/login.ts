import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { authorizeUser } from '../actions/userActions';

const router = express.Router();

router.post("/", async (req, res) => {
    const {username, password} = req.body;

    const userDetails = await authorizeUser(username, password);

    if (!userDetails.length) {
        res.status(400).send(JSON.stringify({success: false, msg: "Username and password don't match."}));
        return;
    } 
});

export {router as login};