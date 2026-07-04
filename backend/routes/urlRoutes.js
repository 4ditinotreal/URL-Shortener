const express = require("express");
const shortid = require("shortid");

const Url = require("../models/Url");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();


/* =========================
   CREATE SHORT URL
========================= */

router.post("/create", auth, async (req, res) => {

try{

const userId = req.user.id;
const user = await User.findById(userId);

/* LIMIT CHECK */
const count = await Url.countDocuments({ userId });

if(user.plan === "free" && count >= 3){
return res.status(403).send("Limit reached. Upgrade to Pro.");
}

/* INPUT */
let original = req.body.url;
let custom = req.body.customCode;

/* FIX URL */
if(!original.startsWith("http")){
  original = "https://" + original;
}

/* 🔥 CUSTOM CODE LOGIC */
let short;

/* If user entered custom */
if(custom){

  /* check if already exists */
  const existing = await Url.findOne({ shortUrl: custom });

  if(existing){
    return res.status(400).send("Custom URL already taken ❌");
  }

  short = custom;

}else{

  /* auto generate */
  short = shortid.generate();

}

/* SAVE */
const newUrl = new Url({
  originalUrl: original,
  shortUrl: short,
  userId: userId
});

await newUrl.save();

res.json({ shortUrl: short });

}
catch(err){
res.status(500).send(err.message);
}

});


/* =========================
   GET USER URLS
========================= */

router.get("/myurls", auth, async (req, res) => {

try{

const urls = await Url.find({ userId: req.user.id }).sort({ _id: -1 });

res.json(urls);

}
catch(err){
res.status(500).send(err.message);
}

});


/* =========================
   DELETE URL
========================= */

router.delete("/:id", auth, async (req,res)=>{

try{

await Url.findByIdAndDelete(req.params.id);

res.send("Deleted");

}
catch(err){
res.status(500).send(err.message);
}

});


module.exports = router;