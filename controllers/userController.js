const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler( async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password ){
        res.status(400);
        throw new Error("all fields are mandatory");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(404);
        throw new Error("user already exist with given email");
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password : hasedPassword
    });

    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
})

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password ){
        res.status(400);
        throw new Error("all fields are mandatory");
    }

    const user = await User.findOne({email});
    if(user && (bcrypt.compare(password, user.password))){
        const token = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
          },
          process.env.SECERT_ACCESS_TOKEN,
          {
            expiresIn: "15m"
          }
        )
        res.status(200).json({token});
    } else {
        res.status(401);
        throw new Error("email or password is not valid");
    }
})

const currentUser = asyncHandler( async (req, res) => {
    res.json(req.user);
})

module.exports = {registerUser, loginUser, currentUser};