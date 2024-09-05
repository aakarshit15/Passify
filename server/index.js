import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./UserModel.js";
import Password from "./PasswordModel.js";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({
    origin: ["http://localhost:5173"]
}));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const verifyToken = (req, res, next) => {
    const bearerToken = req.headers["authorization"];
    if(bearerToken) {
        const token = bearerToken.split(" ")[1];
        jwt.verify(token, "secret", (err, decoded) => {
            if(err) {
                console.log(`Error verifying token: ${err}`);
                res.status(401).json({reqSuccess: false, error: "Invalid Token!!!"});
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({reqSuccess: false, error: "No Token Passed!!!"});
    }
}

mongoose.connect("mongodb://localhost:27017/PassifyDB");

app.post("/register", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({reqSuccess: true});
    } catch (err) {
        console.error(`Error registering user: ${err}`);
        res.status(500).json({reqSuccess:false, error: err});
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (req.body.password === user.password) {
            const tokenData = {
                _id: user._id,
                name: user.name,
                email: user.email
            }
            const token = jwt.sign(tokenData, "secret", {expiresIn: '30d'});
            res.status(200).json({reqSuccess: true, token: token, user: tokenData});
        } else {
            res.status(401).json({reqSuccess: false, error: "Incorrect Password!!!"});
        }
    } catch (err) {
        console.error(`Error logging in: ${err}`);
        res.status(401).json({reqSuccess: false, error: err});
    }
});

app.post("/getUser", verifyToken, (req, res) => {
    res.json({reqSuccess: true, user: req.user});
});

app.post("/createPassword", verifyToken, async (req, res) => {
    console.log(req.body)
    try {
        const password = {...req.body, tags: req.body.tags.split(" "), user_id: req.user._id};
        const newPassword = new Password(password);
        await newPassword.save();
        res.status(200).json({reqSuccess: true});
    } catch (err) {
        console.error(`Error creating password: ${err}`);
        res.status(401).json({reqSuccess: false, error: err});
    }
});

app.post("/getAllPasswords", verifyToken, async (req, res) => {
    try {
        const allPasswords = await Password.find({user_id: req.user._id});
        res.status(200).json({reqSuccess: true, allPasswords: allPasswords});
    } catch (err) {
        console.error(`Error getting all passwords: ${err}`);
        res.status(401).json({reqSuccess: false, error: err});
    }
});

app.patch("/updatePassword/:id", verifyToken, async (req, res) => {
    try {
        await Password.updateOne({_id: req.params.id}, {...req.body, tags: req.body.tags.split(" "), user_id: req.user._id});
        res.status(200).json({reqSuccess: true});        
    } catch (error) {
        console.error(`Error updating password: ${err}`);
        res.status(401).json({reqSuccess: true, error: err});
    }
});

app.delete("/deletePassword/:id", verifyToken, async (req, res) => {
    console.log(req.params.id);
    try {
        await Password.deleteOne({_id: req.params.id});
        res.status(200).json({reqSuccess: true});
    } catch (error) {
        console.error(`Error deleting password: ${err}`);
        res.status(401).json({reqSuccess: false, error: err});
    }
});

app.listen(port, () => {
    console.log(`Your server is running on http://localhost:${port}`)
});