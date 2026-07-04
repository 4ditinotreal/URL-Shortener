const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


/* =========================
   SIGNUP API
========================= */

router.post("/signup", async (req, res) => {

try{

const { email, password } = req.body;

const userExists = await User.findOne({ email });

if(userExists){
return res.status(400).send("User already exists");
}

const salt = await bcrypt.genSalt(10);

const hashedPassword = await bcrypt.hash(password, salt);

const newUser = new User({
email: email,
password: hashedPassword
});

await newUser.save();

res.send("Signup successful");

}
catch(err){
res.status(500).send(err.message);
}

});


/* =========================
   LOGIN API
========================= */

router.post("/login", async (req, res) => {

try{

const { email, password } = req.body;

const user = await User.findOne({ email });

if(!user){
return res.status(400).send("User not found");
}

const validPassword = await bcrypt.compare(password, user.password);

if(!validPassword){
return res.status(400).send("Invalid password");
}

const token = jwt.sign(
{ id: user._id },
"secretkey",
{ expiresIn: "1d" }
);

res.json({ token });

}
catch(err){
res.status(500).send(err.message);
}

});


/* =========================
   FORGOT PASSWORD API
========================= */

router.post("/forgot-password", async (req,res)=>{

try{

const {email,password}=req.body;

const user=await User.findOne({email});

if(!user){
return res.status(404).send("User not found");
}

const salt=await bcrypt.genSalt(10);

user.password=await bcrypt.hash(password,salt);

await user.save();

res.send("Password reset successful");

}
catch(err){
res.status(500).send(err.message);
}

});


module.exports = router;