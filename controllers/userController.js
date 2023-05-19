const Users = require('../models/usersModel');
const asyncHandler = require("express-async-handler");
const { json } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Error } = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();



function generateAccessToken(data) {
    return jwt.sign(
        data,
        process.env.TOKEN_SECRET,
        { expiresIn: '1800s' }
    );
}


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////



const userLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("All Fields are mandatory");
    }

    const user = await Users.findOne({ email });
    console.log(user);


    if (!user) {
        res.status(400);
        throw new Error("User not found, Please Register");
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
        res.status(400);
        throw new Error("Invalid Credentials");
    }

    const data = {
        name: user.name,
        email: user.email,
        _id: user.id
    }

    const token = generateAccessToken(data);

    res.status(200).json({ token });
});

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////


const usersignup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new Error("All Fields are mandatory");
    }

    data = await Users.findOne({ email });

    console.log(data);

    if (data) {
        throw new Error("Email Already Exists");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed Password: ", hashedPassword);


    const newuser = await Users.create({
        name,
        email,
        password: hashedPassword
    });


    if (newuser) {
        res.status(200).json({
            '_id': newuser.id,
            'name': newuser.name,
            'email': newuser.email
        })
    }
    else {
        res.status(400);
        throw new Error("Failed to create user");
    }

    res.status(200).send("User Registered");

});

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

const getCurrentUser = asyncHandler(async (req, res) => {
    console.log({ "msg : ": req.user })
    res.json({ "msg : ": req.user });
});


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

module.exports = {
    userLogin,
    usersignup,
    getCurrentUser
}